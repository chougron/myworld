import * as React from 'react';
import { render } from 'react-dom';
import IMap from '../../../shared/types/map';
import ITile from '../../../shared/types/tile';
import Map from './component/map';
import Menu from './component/menu';
import Tileset from './component/tileset';
import { saveMap } from './services/map';

interface State {
    selected: ITile | undefined;
    map: IMap;
}

class App extends React.Component<{}, State> {
    constructor() {
        super({});

        this.state = {
            selected: undefined,
            map: {
                name: '',
                tiles: [[]],
            },
        };
    }

    render() {
        return (
            <>
                <Map
                    getCurrentTilesetCell={this.getCurrentTilesetCell}
                    tiles={this.state.map.tiles}
                    setTiles={this.setTiles}
                />
                <Menu name={this.state.map.name} setName={this.setName} save={this.save} />
                <Tileset selectTile={this.selectTile} />
            </>
        );
    }

    save = async (): Promise<void> => {
        const map: IMap = await saveMap(this.state.map);
        this.state.map._id = map._id;
    };

    setName = (name: string): void => {
        this.setState({
            ...this.state,
            map: { ...this.state.map, name },
        });
    };

    setTiles = (tiles: ITile[]): void => {
        this.setState({
            ...this.state,
            map: { ...this.state.map, tiles: [tiles] },
        });
    };

    getCurrentTilesetCell = (): number | undefined => {
        return this.state.selected ? this.state.selected.tilesetNumber : undefined;
    };

    selectTile = (tile: ITile): void => {
        this.setState({
            ...this.state,
            selected: tile,
        });
    };
}

render(<App />, document.getElementById('app'));
