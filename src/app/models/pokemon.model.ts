export class Pokemon {
    constructor(
        public height: number,
        public id: number,
        public name: string,
        public sprites: any,
        public types: object[],
        public weight: number
        ){}
}