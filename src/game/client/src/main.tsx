import * as React from 'react';
import { render } from 'react-dom';
import IMap from '../../../shared/types/map';
import { loadMap } from './service/map';
import Map from './component/map';
import ICharacter from '../../../shared/types/character';

interface State {
    map?: IMap;
    characters: ICharacter[];
}

class App extends React.Component<{}, State> {
    constructor() {
        super({});

        this.state = {
            characters: [
                {
                    position: { x: 2, y: 2 },
                },
            ],
        };

        this.initMap();
    }

    initMap = async () => {
        const map = await loadMap('5b70253e3f64c2004bf0d24e');
        this.setState({
            ...this.state,
            map,
        });
    };

    render() {
        return <div>{!!this.state.map && <Map tiles={this.state.map.tiles} characters={this.state.characters} />}</div>;
    }
}

render(<App />, document.getElementById('app'));
