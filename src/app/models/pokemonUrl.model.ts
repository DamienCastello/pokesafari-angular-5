export class PokemonUrl {
    constructor(
        public count: number, 
        public next: string, 
        public previous: null, 
        public results: {name: string, url: string}[]
        ){}
}