import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PokemonsService } from './pokemons.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    capitals: string = '/assets/data/usa-capitals.geojson';
    pokemonsLocation: number[][] = [];
    pokemonsLocationSubscription: Subscription;

    constructor() {

    }

    generatePopup(data: Pokemon[], index: number): string {
        return `` +
        `<div>name: ${ data[index].name }</div>` +
        `<img src="${ data[index].sprites.front_default }" alt="pokemon ${index}">` +
        `<button class="try-catch">
        <img src="../../assets/pokeball.png" alt="pokeball-icon" width="30px" height="30px" >
        </button>`
        
    }



}