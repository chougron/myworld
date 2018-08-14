import * as React from 'react';
import ICoordinates from '../../../../../shared/types/coordinates';
import Tile from '../tile';

interface Props {
    coordinates: ICoordinates;
    maxLayer: number;
}

class BLockingTile extends React.Component<Props> {
    render() {
        const top = this.props.coordinates.y * Tile.SIZE;
        const left = this.props.coordinates.x * Tile.SIZE;
        const width = Tile.SIZE;
        const height = Tile.SIZE;
        const position = 'absolute';
        const background = 'rgba(255,0,0,0.6)';
        const boxSizing = 'border-box';

        const zIndex = 10 + this.props.maxLayer * 2 + 1;

        return (
            <div
                className="tile"
                style={{
                    top,
                    left,
                    width,
                    height,
                    position,
                    background,
                    boxSizing,
                    zIndex,
                }}
            />
        );
    }
}

export default BLockingTile;
