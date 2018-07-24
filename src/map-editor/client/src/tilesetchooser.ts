import TilesetDrawer from './views/tilesetdrawer';
import Coordinates from './utils/coordinates';

export default class TilesetChooser {
    public tilesetdrawer: TilesetDrawer;
    public selectedTile?: Coordinates;

    constructor() {
        this.tilesetdrawer = new TilesetDrawer();

        this.tilesetdrawer.getDrawer().onclick = this.selectTile;
    }

    private selectTile = (event: MouseEvent): void => {
        const target = event.target;
        const data = (<HTMLElement>target).dataset;

        if (this.selectedTile) {
            const oldChosenId = this.tilesetdrawer.getDomId(this.selectedTile);
            document.getElementById(oldChosenId).style.border = '1px solid black';
        }

        this.selectedTile = new Coordinates(parseInt(data.x), parseInt(data.y));
        const newChosendId = this.tilesetdrawer.getDomId(this.selectedTile);
        document.getElementById(newChosendId).style.border = '2px solid red';
    };
}
