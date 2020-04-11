import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy {

  pokemons: Pokemon[];
  pokemonsSubscription: Subscription;
  
  constructor(private pokemonsService: PokemonsService) { }

  ngOnInit(): void {
    this.pokemonsSubscription = this.pokemonsService.pokemonsSubject.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      }
    );
    this.pokemonsService.emitPokemons();
    console.log("pokemons in world: ", this.pokemons);
    const pokeworld = L.map('leaflet-map').setView([50.6311634, 3.0599573], 12);
 
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Pokemon World'
    }).addTo(pokeworld);
  
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([50.6311634, 3.0599573], {icon: myIcon}).bindPopup('<h1>Test</h1><p>test 2</p>').addTo(pokeworld);
  }

  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
  }

}