import * as React from 'react';
import ICoordinates from '../../../../../shared/types/coordinates';
import ITile from '../../../../../shared/types/tile';
import Tile from '../tile';
import './style.css';

interface Props {
    getCurrentTilesetCell: () => number | undefined;
    setTiles: (tiles: ITile[]) => void;
    tiles: ITile[][];
}

class Map extends React.Component<Props> {
    mouseDownCell?: ICoordinates;
    mapLayer: HTMLDivElement;

    render() {
        return (
            <div id="map">
                <div
                    id="map-layer"
                    ref={el => (this.mapLayer = el)}
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                >
                    {this.props.tiles[0].map((tile: ITile) => <Tile tile={tile} />)}
                </div>
            </div>
        );
    }

    mouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.mouseDownCell = this.getCoordinatesFromMapClick(event);
    };

    mouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
        const coordinates = this.getCoordinatesFromMapClick(event);
        this.paintCell(this.mouseDownCell, coordinates);
    };

    paintCell = (down: ICoordinates, up: ICoordinates): void => {
        const currentTilesetCell = this.props.getCurrentTilesetCell();
        if (currentTilesetCell === undefined) {
            return;
        }

        let tiles = this.props.tiles[0];
        for (let x = Math.min(down.x, up.x); x <= Math.max(down.x, up.x); x++) {
            for (let y = Math.min(down.y, up.y); y <= Math.max(down.y, up.y); y++) {
                const coordinates = { x, y };
                // Remove old tile
                tiles = tiles.filter((tile: ITile) => {
                    return tile.position.x !== coordinates.x || tile.position.y !== coordinates.y;
                });
                // Add new one
                const tile: ITile = {
                    position: coordinates,
                    tilesetNumber: currentTilesetCell,
                };
                tiles.push(tile);
            }
        }

        this.props.setTiles(tiles);
    };

    getCoordinatesFromMapClick = (event: React.MouseEvent<HTMLDivElement>): ICoordinates => {
        const mapLayer = this.mapLayer;
        const style = window.getComputedStyle(mapLayer);
        const xPx = event.clientX - parseInt(style.left);
        const yPx = event.clientY - parseInt(style.top);

        return { x: Math.floor(xPx / Tile.SIZE), y: Math.floor(yPx / Tile.SIZE) };
    };
}

export default Map;
