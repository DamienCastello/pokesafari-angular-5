import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../models/pokemon.model';
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy, AfterViewInit {

  map;
  initMap(): void {
    this.map = L.map('map', {
      center: [ 43.6, 3.8833 ],
      zoom: 12
    });
    const tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Pokemon World'
    });

tiles.addTo(this.map);
  }
  pokemons: Pokemon[];
  pokemonsSubscription: Subscription;
  

  constructor(private pokemonsService: PokemonsService, private markerService: MarkerService) { }

  ngOnInit(): void {
    this.pokemonsSubscription = this.pokemonsService.pokemonsSubject.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      }
    );
    this.pokemonsService.emitPokemons();
    
    console.log("pokemons in world: ", this.pokemons);
    /*
    const pokeworld = L.map('map').setView([43.6, 3.8833], 11.5);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Pokemon World'
    }).addTo(pokeworld);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    for (let i = 0; i < 151; i++) {
      
      L.marker([this.pokemonsLocation[i][0], this.pokemonsLocation[i][1]], { icon: myIcon })
        .bindPopup(`
      <h3>${this.pokemons[i].name}</h3>
      <img class="pokemon-front-preview"
        src="${this.pokemons[i].sprites.front_default}"
        alt="pokemon ${i}">
        <button onclick=this.launchPokeball()>
        <img src="../../assets/pokeball.png" alt="pokeball-icon" width="30px" height="30px" >
        </button>
      `)
        .addTo(pokeworld);
    }
*/
  }

  ngAfterViewInit() {
    this.initMap();
    this.markerService.generateMarkers(this.map)
  }

  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
  }

}