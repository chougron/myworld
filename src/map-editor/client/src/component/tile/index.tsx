import * as React from 'react';
import Image from '../../../../../shared/medias/tileset.png';
import ITile from '../../../../../shared/types/tile';
import { getCoordinatesFromTilesetNumber } from '../../../../../shared/service/tileset';

interface Props {
    tile: ITile;
    onClick?: () => void;
    selected?: boolean;
    border?: boolean;
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
        const border = this.props.border ? (this.props.selected ? '2px solid red' : '1px solid black') : 'none';
        const boxSizing = 'border-box';

        const offsetBackground = this.props.border ? (this.props.selected ? 2 : 1) : 0;

        const tilesetCoordinates = getCoordinatesFromTilesetNumber(this.props.tile.tilesetNumber);
        const backgroundPositionX = -tilesetCoordinates.x * Tile.SIZE - offsetBackground;
        const backgroundPositionY = -tilesetCoordinates.y * Tile.SIZE - offsetBackground;
        const zIndex = 10 + this.props.layer * 2 + 1;

        return (
            <div
                className="tile"
                onClick={this.props.onClick}
                style={{
                    top,
                    left,
                    width,
                    height,
                    position,
                    backgroundImage,
                    backgroundPositionX,
                    backgroundPositionY,
                    border,
                    boxSizing,
                    zIndex,
                }}
            />
        );
    }
}

export default Tile;
