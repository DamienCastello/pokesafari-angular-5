export class Pokemon {
    constructor(
        public abilities: object[], 
        public base_experience: number,
        public forms: object[],
        public game_indices: object[],
        public height: number,
        public held_items: any[],
        public id: number,
        public is_default: boolean,
        public location_area_encounters: string,
        public moves: object[],
        public name: string,
        public order: number,
        public species: object,
        public sprites: object,
        public stats: object[],
        public types: object[],
        public weight: number
        ){}
}