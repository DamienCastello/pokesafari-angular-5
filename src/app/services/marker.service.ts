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
        );
       
        this.pokemonsService.generatePokemonsLocation();
        console.log("check locations", this.pokemonsLocation);
        this.pokemonsLocationSubscription.unsubscribe();
    }


    generateMarkersWithPopup(map: any, pokemonsService: PokemonsService): void {
        const myIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
          });
        for (let i = 0; i < 151; i++) {
            L.marker([this.pokemonsLocation[i][0], this.pokemonsLocation[i][1]], { icon: myIcon })
            .addTo(map)
            .bindPopup(this.popupService
            .generatePopup(this.pokemonsService.pokemons, i)) 
            .on('popupopen', function () { 
                document.querySelector('.try-catch').addEventListener("click", e => {
                    e.preventDefault();
                    let random = Math.random();
                    if (random < 0.50) {
                      alert("Yes ! I got him !");
                      pokemonsService.createCatchedPokemon(i)
                    } else {
                      alert("Oh damn ! He escaped !");
                      pokemonsService.createMissedPokemon(i)
                    }
                    map.closePopup();
                  });
            });
        }
    }

}