import TilesetChooser from './tilesetchooser';
import Map from './map';
import TilesetDrawer from './views/tilesetdrawer';
import Menu from './menu';
import { saveMap } from './services/map';

class MapEditorClient {
    public map: Map;
    public tilesetchooser: TilesetChooser;
    public menu: Menu;

    public start = () => {
        this.map = new Map(this.getCurrentTilesetCell);
        this.tilesetchooser = new TilesetChooser();
        this.menu = new Menu(this.onSave);
    };

    public getCurrentTilesetCell = () => {
        const selectedCell = this.tilesetchooser.selectedTile;

        if (selectedCell) {
            return selectedCell.x + selectedCell.y * TilesetDrawer.WIDTH_CELL;
        }

        return;
    };

    public onSave = async (event: MouseEvent): Promise<void> => {
        const data = await saveMap(this.map);

        this.map._id = data._id;
    };
}

const mapEditorClient = new MapEditorClient();
mapEditorClient.start();

(<any>window).mapEditorClient = mapEditorClient;
