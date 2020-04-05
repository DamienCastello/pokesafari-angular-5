import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  pokemons: Pokemon[];
  
  constructor() { }

  ngOnInit(): void {
    console.log("pokemons in world: ", this.pokemons);
  }

}
