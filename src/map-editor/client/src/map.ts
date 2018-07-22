import MapDrawer from './engine/mapdrawer';
import Tile from './utils/tile';
import Coordinates from './utils/coordinates';
import TileDrawer from './engine/tiledrawer';

export default class Map {
    public mapdrawer: MapDrawer;

    private mapData: Tile[] = [];

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

        this.save();
    };

    private removeOldCell = (coordinates: Coordinates): void => {
        const oldId = TileDrawer.getTileDomId(coordinates);
        document.getElementById(oldId) && document.getElementById(oldId).remove();

        const mapDataIndex = this.mapData.findIndex(
            (tile: Tile) => tile.getX() === coordinates.x && tile.getY() === coordinates.y,
        );
        if (mapDataIndex !== -1) {
            this.mapData.splice(mapDataIndex, 1);
        }
    };

    private addNewCell = (coordinates: Coordinates): void => {
        const currentTilesetCell = this.getCurrentTilesetCell();
        const tile = new Tile(coordinates, currentTilesetCell);

        this.mapdrawer.addTile(tile);
        this.mapData.push(tile);
    };

    private getCoordinatesFromMapClick = (event: MouseEvent) => {
        const mapLayer = this.mapdrawer.getMapLayer();
        const xPx = event.clientX - parseInt(mapLayer.style.left);
        const yPx = event.clientY - parseInt(mapLayer.style.top);

        return new Coordinates(Math.floor(xPx / TileDrawer.SIZE), Math.floor(yPx / TileDrawer.SIZE));
    };

    public save = () => {
        const json = this.dataToJson();

        console.log(json);
    };

    private dataToJson = () => {
        const json = this.mapData.map((tile: Tile) => {
            return {
                x: tile.getX(),
                y: tile.getY(),
                tile: tile.tilesetNumber,
            };
        });

        return json;
    };
}
