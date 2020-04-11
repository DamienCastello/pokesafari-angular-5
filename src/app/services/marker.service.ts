import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PokemonsService } from './pokemons.service';
import { Subscription } from 'rxjs';
import { PopupService } from './popup.service';

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    pokemonsLocation: number[][] = [];
    pokemonsLocationSubscription: Subscription;

    constructor(private pokemonsService: PokemonsService, private popupService: PopupService) {
        this.pokemonsLocationSubscription = this.pokemonsService.pokemonsLocationSubject.subscribe(
            (pokemonsLocation: number[][]) => {
                this.pokemonsLocation = pokemonsLocation;
            }
        )
        this.pokemonsService.generatePokemonsLocation();
        console.log("check locations", this.pokemonsLocation);
        this.pokemonsLocationSubscription.unsubscribe();
    }


    generateMarkers(map: any): void {
        const myIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
          });
        for (let i = 0; i < 151; i++) {
            L.marker([this.pokemonsLocation[i][0], this.pokemonsLocation[i][1]], { icon: myIcon }).addTo(map).bindPopup(this.popupService.generatePopup(this.pokemonsService.pokemons, i))
        }
    }

}