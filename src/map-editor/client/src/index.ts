import TilesetChooser from './tilesetchooser';
import Map from './map';
import TilesetDrawer from './engine/tilesetdrawer';

class MapEditorClient {
    public map: Map;
    public tilesetchooser: TilesetChooser;

    public start = () => {
        this.map = new Map(this.getCurrentTilesetCell);
        this.tilesetchooser = new TilesetChooser();
    };

    public getCurrentTilesetCell = () => {
        const selectedCell = this.tilesetchooser.selectedTile;

        if (selectedCell) {
            return selectedCell.x + selectedCell.y * TilesetDrawer.WIDTH_CELL;
        }

        return;
    };
}

const mapEditorClient = new MapEditorClient();
mapEditorClient.start();

(<any>window).mapEditorClient = mapEditorClient;
