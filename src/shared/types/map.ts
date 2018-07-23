import ITile from './tile';

export default interface IMap {
    _id?: string;
    name: string;
    tiles: ITile[][];
}
