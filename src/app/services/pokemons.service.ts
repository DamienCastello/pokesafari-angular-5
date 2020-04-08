import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  pokemons: Pokemon[] = [];
  catchedPokemons: Pokemon[] = [];
  missedPokemons: Pokemon[] = [];
  pokemonsSubject = new Subject<Pokemon[]>();
  catchedPokemonsSubject = new Subject<Pokemon[]>();
  missedPokemonsSubject = new Subject<Pokemon[]>();

  constructor() { }

  setPokemons(array) {
    console.log(array.length , "setPokemons")
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

  createCatchedPokemon(newCatched: Pokemon) {
    this.catchedPokemons.push(newCatched);
    this.catchPokemon();
    this.emitCatchedPokemons();
  }

  createMissedPokemon(newMissed: Pokemon) {
    this.missedPokemons.push(newMissed);
    this.catchPokemon();
    this.emitMissedPokemons();
  }

  createList() {
    this.setList();
    this.emitPokemons();
  }

  restart(){
    this.catchedPokemons = [];
    this.missedPokemons = [];
    this.catchPokemon();
    this.missPokemon();
    this.emitCatchedPokemons();
    this.emitMissedPokemons();
  }

}