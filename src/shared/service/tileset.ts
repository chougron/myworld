import ICoordinates from '../types/coordinates';

const TILESET_WIDTH = 20;

const getXFromTilesetNumber = (number: number): number => number % TILESET_WIDTH;
const getYFromTilesetNumber = (number: number): number => Math.floor(number / TILESET_WIDTH);
const getCoordinatesFromTilesetNumber = (number: number): ICoordinates => {
    return {
        x: getXFromTilesetNumber(number),
        y: getYFromTilesetNumber(number),
    };
};

export { getXFromTilesetNumber, getYFromTilesetNumber, getCoordinatesFromTilesetNumber };
