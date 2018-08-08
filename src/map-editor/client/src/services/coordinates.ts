import ICoordinates from '../../../../shared/types/coordinates';

const getXFromTilesetNumber = (number: number, tilesetWidth: number): number => number % tilesetWidth;
const getYFromTilesetNumber = (number: number, tilesetWidth: number): number => Math.floor(number / tilesetWidth);
const getCoordinatesFromTilesetNumber = (number: number, tilesetWidth: number): ICoordinates => {
    return {
        x: getXFromTilesetNumber(number, tilesetWidth),
        y: getYFromTilesetNumber(number, tilesetWidth),
    };
};

export { getXFromTilesetNumber, getYFromTilesetNumber, getCoordinatesFromTilesetNumber };
