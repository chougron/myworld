import Coordinates from './coordinates';
import Drawable from './drawable';

export default class Tile extends Drawable {
    public tilesetNumber: number;

    constructor(position: Coordinates, tilesetNumber: number) {
        super(position);
        this.tilesetNumber = tilesetNumber;
    }
}
