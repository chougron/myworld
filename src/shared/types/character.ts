import ICoordinates from './coordinates';
import IDirection from './direction';

export default interface ICharacter {
    _id: string;
    position: ICoordinates;
    direction: IDirection;
}
