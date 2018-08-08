import * as React from 'react';
import { render } from 'react-dom';
import Map from './component/map';
import Tileset from './component/tileset';
import ITile from '../../../shared/types/tile';

interface State {
    selected: ITile;
}

class App extends React.Component<{}, State> {
    render() {
        //return <div>Bonjour</div>;
        return (
            <>
                <Map getCurrentTilesetCell={this.getCurrentTilesetCell} />
                <Tileset selectTile={this.selectTile} />
            </>
        );
    }

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
