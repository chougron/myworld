import ICoordinates from '../../../../shared/types/coordinates';

export default class Coordinates implements ICoordinates {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static getFromClick = (event: MouseEvent, tilesize: number): Coordinates => {
        const x = Math.floor(event.layerX / tilesize);
        const y = Math.floor(event.layerY / tilesize);

        return new Coordinates(x, y);
    };

    public static getXFromTilesetNumber = (number: number, tilesetWidth: number): number => number % tilesetWidth;
    public static getYFromTilesetNumber = (number: number, tilesetWidth: number): number =>
        Math.floor(number / tilesetWidth);
}
