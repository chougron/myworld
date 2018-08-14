import * as React from 'react';
import ICoordinates from '../../../../../shared/types/coordinates';
import ITile from '../../../../../shared/types/tile';
import BLockingTile from '../blockingTile';
import Menu from '../menu';
import Tile from '../tile';
import './style.css';

interface Props {
    getCurrentTilesetCell: () => number | undefined;
    setTiles: (tiles: ITile[]) => void;
    setBlockingTiles: (blockingTiles: ICoordinates[]) => void;
    tiles: ITile[][];
    currentLayer: number;
    blockingTiles: ICoordinates[];
}

class Map extends React.Component<Props> {
    mouseDownCell?: ICoordinates;
    mapLayer: HTMLDivElement;

    render() {
        const lastLayer =
            this.props.currentLayer === Menu.BLOCKING_LAYER ? this.props.tiles.length : this.props.currentLayer;

        const lastLayerZIndex =
            this.props.currentLayer === Menu.BLOCKING_LAYER
                ? 10 + this.props.tiles.length * 2
                : 10 + (this.props.currentLayer - 1) * 2;

        return (
            <div id="map">
                <div
                    id="map-layer"
                    ref={el => (this.mapLayer = el)}
                    onMouseDown={this.mouseDown}
                    onMouseUp={this.mouseUp}
                >
                    <div id="map-last-layer-shadow" style={{ zIndex: lastLayerZIndex }} />
                    {this.props.tiles.map((tiles: ITile[], index: number) => {
                        return index <= lastLayer - 1
                            ? tiles.map((tile: ITile, key: number) => <Tile tile={tile} layer={index} key={key} />)
                            : null;
                    })}
                    {this.props.currentLayer === Menu.BLOCKING_LAYER &&
                        this.props.blockingTiles.map((coordinates: ICoordinates, index: number) => {
                            return (
                                <BLockingTile
                                    coordinates={coordinates}
                                    key={index}
                                    maxLayer={this.props.tiles.length}
                                />
                            );
                        })}
                </div>
            </div>
        );
    }

    mouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.mouseDownCell = this.getCoordinatesFromMapClick(event);
    };

    mouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
        const coordinates = this.getCoordinatesFromMapClick(event);
        if (this.props.currentLayer === Menu.BLOCKING_LAYER) {
            this.paintBlockingTiles(this.mouseDownCell, coordinates);
        } else {
            this.paintCell(this.mouseDownCell, coordinates);
        }
    };

    /**
     * Paint the cells of the current layer
     */
    paintCell = (down: ICoordinates, up: ICoordinates): void => {
        const currentTilesetCell = this.props.getCurrentTilesetCell();
        if (currentTilesetCell === undefined) {
            return;
        }

        let tiles =
            this.props.tiles.length >= this.props.currentLayer ? this.props.tiles[this.props.currentLayer - 1] : [];
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

    /**
     * Paint blocking tiles
     */
    paintBlockingTiles = (down: ICoordinates, up: ICoordinates): void => {
        let blockingTiles = this.props.blockingTiles;

        for (let x = Math.min(down.x, up.x); x <= Math.max(down.x, up.x); x++) {
            for (let y = Math.min(down.y, up.y); y <= Math.max(down.y, up.y); y++) {
                // Remove if exists
                const filtered = blockingTiles.filter((coordinates: ICoordinates) => {
                    return coordinates.x !== x || coordinates.y !== y;
                });

                if (filtered.length === blockingTiles.length) {
                    // If it did not exist, length is same, and add one
                    const newBlockingTile: ICoordinates = { x, y };
                    blockingTiles.push(newBlockingTile);
                } else {
                    // Otherwise, you filtered the array
                    blockingTiles = filtered;
                }
            }
        }

        this.props.setBlockingTiles(blockingTiles);
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
