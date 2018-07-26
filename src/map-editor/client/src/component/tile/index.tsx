import * as React from 'react';
import ITile from '../../../../../shared/types/tile';
import TileDrawer from '../../views/tiledrawer';

interface Props {
    tile: ITile;
}

class Tile extends React.Component<Props> {
    render() {
        const top = this.props.tile.position.y * TileDrawer.SIZE;
        const left = this.props.tile.position.x * TileDrawer.SIZE;
        const width = TileDrawer.SIZE;
        const height = TileDrawer.SIZE;
        const background = 'red';
        const position = 'absolute';

        return <div className="tile" style={{ top, left, width, height, background, position }} />;
    }
}

export default Tile;
