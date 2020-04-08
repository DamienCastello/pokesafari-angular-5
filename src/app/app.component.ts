import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './models/pokemon.model';
import { PokemonUrl } from './models/pokemonUrl.model';
import { PokemonsService } from './services/pokemons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  pokemons: Pokemon[] = [];
  pokemonsListUrl: PokemonUrl[] = [];
  PokemonsSubscription: Subscription;

  constructor(private http: HttpClient, private PokemonsService: PokemonsService) {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAC5RaAAfvVuz4bvQndwAXySaEbsQ9izio",
      authDomain: "pokesafari-6a833.firebaseapp.com",
      databaseURL: "https://pokesafari-6a833.firebaseio.com",
      projectId: "pokesafari-6a833",
      storageBucket: "pokesafari-6a833.appspot.com",
      messagingSenderId: "338023879079",
      appId: "1:338023879079:web:37ba8dd40d8e33e7162682"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  loadPokemonsDetails() {
    this.pokemonsListUrl.map((pokemon: any) => {
      this.http.get(`${pokemon.url}`).subscribe(
         (response: Pokemon) => {
           console.log("check pokemons in appComp before push():", this.pokemons);
           this.pokemons.push({
            height: response.height,
            id: response.id,
            name: response.name,
            sprites: response.sprites,
            types: response.types,
            weight: response.weight
          });
          console.log("check pokemons in appComp after push():", this.pokemons);
          console.log("check pokemonService before", this.PokemonsService.pokemons);
          this.PokemonsService.pokemons = this.pokemons;
          console.log("check pokemonService after", this.PokemonsService.pokemons);
         }
       );
       
    });
    this.PokemonsService.setPokemons(this.pokemons);
    this.PokemonsService.createList();

  }

  ngOnInit() {
    this.PokemonsSubscription = this.PokemonsService.pokemonsSubject.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      }
    );
    this.PokemonsService.emitPokemons();


    this.http.get<any[]>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .subscribe(
        (response: any) => {
          console.log("check response: ", response);
          this.pokemonsListUrl = response.results;
          console.log("check pokemonsListUrl: ", this.pokemonsListUrl);
          this.loadPokemonsDetails();
        },
        (error) => { console.log("erreur: ", error); }
      );
  }

  ngOnDestroy() {
    this.PokemonsSubscription.unsubscribe();
  }

}
