import ICoordinates from './coordinates';
import ITile from './tile';

export default interface IMap {
    _id?: string;
    name: string;
    tiles: ITile[][];
    blockingTiles: ICoordinates[];
}
