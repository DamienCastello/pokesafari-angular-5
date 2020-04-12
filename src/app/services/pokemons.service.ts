import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  pokemonsLocation: number[][] = [];
  pokemons: Pokemon[] = [];
  catchedPokemons: number[] = [];
  missedPokemons: number[] = [];
  pokemonsSubject = new Subject<Pokemon[]>();
  catchedPokemonsSubject = new Subject<number[]>();
  missedPokemonsSubject = new Subject<number[]>();
  pokemonsLocationSubject = new Subject<number[][]>();



  constructor() { }

  setPokemons(array) {
    console.log(array.length, "setPokemons")
    this.pokemons = array;
  }

  emitPokemons() {
    this.pokemonsSubject.next(this.pokemons);
  }

  emitCatchedPokemons() {
    this.catchedPokemonsSubject.next(this.catchedPokemons)
  }

  emitMissedPokemons() {
    this.missedPokemonsSubject.next(this.missedPokemons)
  }

  emitPokemonsLocation() {
    this.pokemonsLocationSubject.next(this.pokemonsLocation)
  }

  setList() {
    console.log("check pokemons before set", this.pokemons);
    console.log(this.pokemons.length);
    firebase.database().ref('/pokemons').set(this.pokemons);
    console.log("check pokemons after set", this.pokemons);
  }


  catchPokemon() {
    firebase.database().ref('/catched').set(this.catchedPokemons);
  }

  missPokemon() {
    firebase.database().ref('/missed').set(this.missedPokemons);
  }

  getList() {
    firebase.database().ref('/pokemons')
      .on('value', (data) => {
        this.pokemons = data.val() ? data.val() : [];
        this.emitPokemons();
      });
  }

  getSinglePokemon(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/pokemons/' + id).once('value')
          .then((data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
          );
      }
    );
  }

  createCatchedPokemon(newCatched: number) {
    this.catchedPokemons.push(newCatched);
    this.catchPokemon();
    this.emitCatchedPokemons();
  }

  createMissedPokemon(newMissed: number) {
    this.missedPokemons.push(newMissed);
    this.missPokemon();
    this.emitMissedPokemons();
  }

  createList() {
    this.setList();
    this.emitPokemons();
  }

  restart() {
    this.catchedPokemons = [];
    this.missedPokemons = [];
    this.catchPokemon();
    this.missPokemon();
    this.emitCatchedPokemons();
    this.emitMissedPokemons();
  }

  generatePokemonsLocation() {
    for (let i = 0; i < 151; i++) {
      let randomLong = Math.random() < 0.5 ? -1 : 1;
      let randomLat = Math.random() < 0.5 ? -1 : 1;
      this.pokemonsLocation.push(
        //Generate locations randomly around of Montpellier
        [
          43.6 + (Math.random() / 10) * randomLat,
          3.8833 + (Math.random() / 10) * randomLong
        ]
      )
    }
    this.emitPokemonsLocation();
  }

}