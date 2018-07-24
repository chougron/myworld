import Tileset from '../../../../shared/medias/tileset.png';
import Coordinates from '../utils/coordinates';
import TileDrawer from './tiledrawer';

export default class TilesetDrawer {
    private drawer: HTMLDivElement;
    private tileset: HTMLImageElement;

    public static readonly WIDTH_CELL: number = 20;

    constructor() {
        const body = document.body;

        this.drawer = document.createElement('div');
        this.drawer.style.border = '1px solid black';
        this.drawer.style.width = TilesetDrawer.WIDTH_CELL * TileDrawer.SIZE + 'px';
        this.drawer.style.right = '0';
        this.drawer.style.top = '40px';
        this.drawer.style.height = 'calc(100% - 40px)';
        this.drawer.style.boxSizing = 'border-box';
        this.drawer.style.position = 'absolute';
        this.drawer.style.overflow = 'hidden';

        this.tileset = new Image();
        this.tileset.src = Tileset;
        this.tileset.style.zIndex = '0';

        this.drawer.appendChild(this.tileset);

        body.appendChild(this.drawer);

        this.displayLines();
    }

    public getDrawer = () => this.drawer;

    private displayLines = () => {
        const height = this.drawer.clientHeight;

        for (let y = 0; y * TileDrawer.SIZE < height; y++) {
            for (let x = 0; x < TilesetDrawer.WIDTH_CELL; x++) {
                const borderElement = document.createElement('div');
                borderElement.style.border = '1px solid black';
                borderElement.style.width = TileDrawer.SIZE + 'px';
                borderElement.style.height = TileDrawer.SIZE + 'px';
                borderElement.style.boxSizing = 'border-box';
                borderElement.style.position = 'absolute';
                borderElement.style.top = y * TileDrawer.SIZE + 'px';
                borderElement.style.left = x * TileDrawer.SIZE + 'px';
                borderElement.style.zIndex = '1';

                borderElement.id = this.getDomId(new Coordinates(x, y));
                borderElement.dataset.x = x.toString();
                borderElement.dataset.y = y.toString();

                this.drawer.appendChild(borderElement);
            }
        }
    };

    public getDomId = (coordinates: Coordinates): string => 'tileset-' + coordinates.x + '-' + coordinates.y;
}
