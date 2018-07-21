import Tile from '../utils/tile';
import Coordinates from '../utils/coordinates';
import Tileset from '../../../../shared/medias/tileset.png';
import TilesetDrawer from './tilesetdrawer';

export default class TileDrawer {
    public static readonly SIZE: number = 32;

    public static draw = (tile: Tile): HTMLDivElement => {
        const div = document.createElement('div');
        div.style.top = tile.getY() * TileDrawer.SIZE + 'px';
        div.style.left = tile.getX() * TileDrawer.SIZE + 'px';
        div.style.position = 'absolute';
        div.style.width = TileDrawer.SIZE + 'px';
        div.style.height = TileDrawer.SIZE + 'px';
        div.style.backgroundImage = 'url(' + Tileset + ')';
        div.style.backgroundPositionX =
            '-' +
            Coordinates.getXFromTilesetNumber(tile.tilesetNumber, TilesetDrawer.WIDTH_CELL) * TileDrawer.SIZE +
            'px';
        div.style.backgroundPositionY =
            '-' +
            Coordinates.getYFromTilesetNumber(tile.tilesetNumber, TilesetDrawer.WIDTH_CELL) * TileDrawer.SIZE +
            'px';

        div.style.zIndex = '1'; //Replace if several layers

        div.id = TileDrawer.getTileDomId(tile.getPosition());

        return div;
    };

    public static getTileDomId = (coordinates: Coordinates): string => 'tile-' + coordinates.x + '-' + coordinates.y;
}
