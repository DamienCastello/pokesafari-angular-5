import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, OnDestroy {

  pokemons: Pokemon[];
  pokemonsSubscription: Subscription;
  

  constructor( private pokemonsService: PokemonsService,
               private router: Router ) { }

  ngOnInit(): void {
    this.pokemonsSubscription = this.pokemonsService.pokemonsSubject.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      }
    );
    this.pokemonsService.emitPokemons();
    console.log("pokemons in pokedex: ", this.pokemons);
  }

  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
  }

}
