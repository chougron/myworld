import MapDrawer from './engine/mapdrawer';
import Tile from './utils/tile';
import Coordinates from './utils/coordinates';
import TileDrawer from './engine/tiledrawer';

export default class Map {
    public mapdrawer: MapDrawer;

    public getCurrentTilesetCell: () => number;

    constructor(getCurrentTilesetCell: () => number) {
        this.getCurrentTilesetCell = getCurrentTilesetCell;

        this.mapdrawer = new MapDrawer();
        this.mapdrawer.getDrawer().onclick = this.paintCell;
    }

    private paintCell = (event: MouseEvent): void => {
        const currentTilesetCell = this.getCurrentTilesetCell();
        if (currentTilesetCell === undefined) {
            return;
        }

        const coordinates = this.getCoordinatesFromMapClick(event);

        const oldId = TileDrawer.getTileDomId(coordinates);
        document.getElementById(oldId) && document.getElementById(oldId).remove();

        this.mapdrawer.addTile(new Tile(coordinates, currentTilesetCell));
    };

    private getCoordinatesFromMapClick = (event: MouseEvent) => {
        const mapLayer = this.mapdrawer.getMapLayer();
        const xPx = event.clientX - parseInt(mapLayer.style.left);
        const yPx = event.clientY - parseInt(mapLayer.style.top);

        return new Coordinates(Math.floor(xPx / TileDrawer.SIZE), Math.floor(yPx / TileDrawer.SIZE));
    };
}
