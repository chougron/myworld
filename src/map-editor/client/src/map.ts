import MapDrawer from './views/mapdrawer';
import Tile from './utils/tile';
import Coordinates from './utils/coordinates';
import TileDrawer from './views/tiledrawer';
import IMap from '../../../shared/types/map';

export default class Map implements IMap {
    public mapdrawer: MapDrawer;

    public _id?: string;
    public name: string = 'Map';
    public tiles: Tile[][] = [[]];

    private mouseDownCell?: Coordinates;
    public getCurrentTilesetCell: () => number;

    constructor(getCurrentTilesetCell: () => number) {
        this.getCurrentTilesetCell = getCurrentTilesetCell;

        this.mapdrawer = new MapDrawer();
        this.mapdrawer.getDrawer().onmousedown = this.mouseDown;
        this.mapdrawer.getDrawer().onmouseup = this.mouseUp;
    }

    private mouseDown = (event: MouseEvent): void => {
        this.mouseDownCell = this.getCoordinatesFromMapClick(event);
    };

    private mouseUp = (event: MouseEvent): void => {
        const coordinates = this.getCoordinatesFromMapClick(event);

        this.paintCell(this.mouseDownCell, coordinates);
    };

    private paintCell = (down: Coordinates, up: Coordinates): void => {
        const currentTilesetCell = this.getCurrentTilesetCell();
        if (currentTilesetCell === undefined) {
            return;
        }

        for (let x = Math.min(down.x, up.x); x <= Math.max(down.x, up.x); x++) {
            for (let y = Math.min(down.y, up.y); y <= Math.max(down.y, up.y); y++) {
                const coordinates = new Coordinates(x, y);
                this.removeOldCell(coordinates);
                this.addNewCell(coordinates);
            }
        }
    };

    private removeOldCell = (coordinates: Coordinates): void => {
        const oldId = TileDrawer.getTileDomId(coordinates);
        document.getElementById(oldId) && document.getElementById(oldId).remove();

        const mapDataIndex = this.tiles[0].findIndex(
            (tile: Tile) => tile.getX() === coordinates.x && tile.getY() === coordinates.y,
        );
        if (mapDataIndex !== -1) {
            this.tiles[0].splice(mapDataIndex, 1);
        }
    };

    private addNewCell = (coordinates: Coordinates): void => {
        const currentTilesetCell = this.getCurrentTilesetCell();
        const tile = new Tile(coordinates, currentTilesetCell);

        this.mapdrawer.addTile(tile);
        this.tiles[0].push(tile);
    };

    private getCoordinatesFromMapClick = (event: MouseEvent) => {
        const mapLayer = this.mapdrawer.getMapLayer();
        const xPx = event.clientX - parseInt(mapLayer.style.left);
        const yPx = event.clientY - parseInt(mapLayer.style.top);

        return new Coordinates(Math.floor(xPx / TileDrawer.SIZE), Math.floor(yPx / TileDrawer.SIZE));
    };
}
