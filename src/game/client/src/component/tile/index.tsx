import * as React from 'react';
import Image from '../../../../../shared/medias/tileset.png';
import ITile from '../../../../../shared/types/tile';
import { getCoordinatesFromTilesetNumber } from '../../../../../shared/service/tileset';

interface Props {
    tile: ITile;
    layer: number;
}

class Tile extends React.Component<Props> {
    static SIZE: number = 32;

    render() {
        const top = this.props.tile.position.y * Tile.SIZE;
        const left = this.props.tile.position.x * Tile.SIZE;
        const width = Tile.SIZE;
        const height = Tile.SIZE;
        const position = 'absolute';
        const image = Image;
        const backgroundImage = `url(${image})`;
        const boxSizing = 'border-box';

        const tilesetCoordinates = getCoordinatesFromTilesetNumber(this.props.tile.tilesetNumber);
        const backgroundPositionX = -tilesetCoordinates.x * Tile.SIZE;
        const backgroundPositionY = -tilesetCoordinates.y * Tile.SIZE;
        const zIndex = 10 + this.props.layer * 2 + 1;

        return (
            <div
                className="tile"
                style={{
                    top,
                    left,
                    width,
                    height,
                    position,
                    backgroundImage,
                    backgroundPositionX,
                    backgroundPositionY,
                    boxSizing,
                    zIndex,
                }}
            />
        );
    }
}

export default Tile;
