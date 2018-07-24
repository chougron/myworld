import Tile from '../utils/tile';
import TileDrawer from './tiledrawer';
import Coordinates from '../utils/coordinates';

export default class MapDrawer {
    private drawer: HTMLDivElement;
    private mapLayer: HTMLDivElement;

    constructor() {
        const body = document.body;
        body.style.height = '100%';
        body.style.width = '100%';
        body.style.margin = '0';
        body.style.padding = '0';

        this.drawer = document.createElement('div');
        this.drawer.style.border = '1px solid black';
        this.drawer.style.width = 'calc(100% - 640px)';
        this.drawer.style.height = '100%';
        this.drawer.style.boxSizing = 'border-box';
        this.drawer.style.position = 'absolute';
        this.drawer.style.overflow = 'hidden';

        this.mapLayer = document.createElement('div');
        this.mapLayer.style.width = '100%';
        this.mapLayer.style.height = '100%';
        this.mapLayer.style.position = 'absolute';
        this.mapLayer.style.overflow = 'visible';
        this.mapLayer.style.top = '0';
        this.mapLayer.style.left = '0';

        this.drawer.appendChild(this.mapLayer);

        body.appendChild(this.drawer);
    }

    public getDrawer = () => this.drawer;
    public getMapLayer = () => this.mapLayer;

    public addTiles = (tiles: Tile[]): void => {
        tiles.forEach((tile: Tile) => {
            const drawn = TileDrawer.draw(tile);
            this.mapLayer.appendChild(drawn);
        });
    };

    public addTile = (tile: Tile): void => {
        const drawn = TileDrawer.draw(tile);
        this.mapLayer.appendChild(drawn);
    };

    public removeTile = (coordinates: Coordinates): void => {
        const id = TileDrawer.getTileDomId(coordinates);
        const domElement = document.getElementById(id);
        domElement.remove();
    };
}
