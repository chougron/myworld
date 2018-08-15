import * as React from 'react';
import { render } from 'react-dom';
import ICoordinates from '../../../shared/types/coordinates';
import IMap from '../../../shared/types/map';
import ITile from '../../../shared/types/tile';
import Map from './component/map';
import MapList from './component/mapList';
import Menu from './component/menu';
import Tileset from './component/tileset';
import { loadMaps, saveMap, removeMap } from './services/map';

interface State {
    selected: ITile | undefined;
    map: IMap;
    displayedMapList: boolean;
    loadedMaps: IMap[];
    currentLayer: number;
}

class App extends React.Component<{}, State> {
    constructor() {
        super({});

        this.state = {
            selected: undefined,
            map: {
                name: '',
                tiles: [[]],
                blockingTiles: [],
            },
            displayedMapList: false,
            loadedMaps: [],
            currentLayer: 1,
        };
    }

    render() {
        return (
            <>
                <Map
                    getCurrentTilesetCell={this.getCurrentTilesetCell}
                    tiles={this.state.map.tiles}
                    setTiles={this.setTiles}
                    setBlockingTiles={this.setBlockingTiles}
                    currentLayer={this.state.currentLayer}
                    blockingTiles={this.state.map.blockingTiles}
                />
                <Menu
                    name={this.state.map.name}
                    setName={this.setName}
                    save={this.save}
                    load={this.displayMapList}
                    new={this.newMap}
                    currentLayer={this.state.currentLayer}
                    maxLayer={this.state.map.tiles.length}
                    setLayer={this.setCurrentLayer}
                    removeLayer={this.removeLayer}
                    addLayer={this.addLayer}
                />
                <Tileset selectTile={this.selectTile} />
                {this.state.displayedMapList && (
                    <MapList maps={this.state.loadedMaps} loadMap={this.loadMap} deleteMap={this.deleteMap} />
                )}
            </>
        );
    }

    /**
     * Save the current map
     */
    save = async (): Promise<void> => {
        const map: IMap = await saveMap(this.state.map);
        this.state.map._id = map._id;
    };

    /**
     * Set the name of the current map
     */
    setName = (name: string): void => {
        this.setState({
            ...this.state,
            map: { ...this.state.map, name },
        });
    };

    /**
     * Set the current layer used
     */
    setCurrentLayer = (layer: number): void => {
        this.setState({
            ...this.state,
            currentLayer: layer,
        });
    };

    /**
     * Remove last layer from the map
     */
    removeLayer = (): void => {
        const tiles = this.state.map.tiles;
        if (tiles.length <= 1) {
            return;
        }
        tiles.splice(-1, 1);
        const currentLayer = this.state.currentLayer > tiles.length ? tiles.length : this.state.currentLayer;
        this.setState({
            ...this.state,
            map: { ...this.state.map, tiles },
            currentLayer,
        });
    };

    /**
     * Add a new layer to the map
     */
    addLayer = (): void => {
        const tiles = this.state.map.tiles;
        tiles.push([]);
        this.setState({
            ...this.state,
            map: { ...this.state.map, tiles },
        });
    };

    /**
     * Display the list of maps, to load one
     */
    displayMapList = async (): Promise<void> => {
        const maps = await loadMaps();
        this.setState({
            ...this.state,
            loadedMaps: maps,
            displayedMapList: true,
        });
    };

    /**
     * Load the selected map
     */
    loadMap = (map: IMap): void => {
        if (!map.blockingTiles) {
            map.blockingTiles = [];
        }
        if (!map.tiles) {
            map.tiles = [[]];
        }
        this.setState({
            ...this.state,
            map,
            displayedMapList: false,
            currentLayer: 1,
        });
    };

    /**
     * Delete a map from the map list
     */
    deleteMap = async (map: IMap): Promise<void> => {
        await removeMap(map);
        if (map._id === this.state.map._id) {
            this.newMap();
        }
        this.displayMapList();
    };

    /**
     * Start a new map
     */
    newMap = (): void => {
        this.setState({
            ...this.state,
            map: {
                name: '',
                tiles: [[]],
                blockingTiles: [],
            },
            currentLayer: 1,
        });
    };

    /**
     * Set the tiles to the current map
     */
    setTiles = (tiles: ITile[]): void => {
        const mapTiles = this.state.map.tiles;
        mapTiles[this.state.currentLayer - 1] = tiles;
        this.setState({
            ...this.state,
            map: { ...this.state.map, tiles: mapTiles },
        });
    };

    /**
     * Set the blocking tiles to the current map
     */
    setBlockingTiles = (blockingTiles: ICoordinates[]): void => {
        this.setState({
            ...this.state,
            map: { ...this.state.map, blockingTiles },
        });
    };

    /**
     * Get the current tileset cell number
     */
    getCurrentTilesetCell = (): number | undefined => {
        return this.state.selected ? this.state.selected.tilesetNumber : undefined;
    };

    /**
     * Select a tile on the tileset
     */
    selectTile = (tile: ITile): void => {
        this.setState({
            ...this.state,
            selected: tile,
        });
    };
}

render(<App />, document.getElementById('app'));
