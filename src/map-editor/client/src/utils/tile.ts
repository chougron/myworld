import Coordinates from './coordinates';
import Drawable from './drawable';
import ITile from '../../../../shared/types/tile';

export default class Tile extends Drawable implements ITile {
    public tilesetNumber: number;

    constructor(position: Coordinates, tilesetNumber: number) {
        super(position);
        this.tilesetNumber = tilesetNumber;
    }
}
