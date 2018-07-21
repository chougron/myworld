import Coordinates from './coordinates';

export default class Drawable {
    protected position: Coordinates;

    constructor(position: Coordinates) {
        this.position = position;
    }

    public getX = (): number => {
        return this.position.x;
    };

    public getY = (): number => {
        return this.position.y;
    };

    public getPosition = (): Coordinates => {
        return this.position;
    };
}
