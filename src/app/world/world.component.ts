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
      center: [43.6, 3.8833],
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

  }

  ngAfterViewInit() {
    this.initMap();
    this.markerService.generateMarkersWithPopup(this.map, this.pokemonsService);
    this.pokemonsService.restart();
  }

  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
  }
}