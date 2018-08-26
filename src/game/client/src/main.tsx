import * as React from 'react';
import { render } from 'react-dom';
import IMap from '../../../shared/types/map';
import { loadMap } from './service/map';
import Map from './component/map';
import ICharacter from '../../../shared/types/character';
import IDirection from '../../../shared/types/direction';
import { Provider } from 'react-redux';
import store from './store';
import { CharacterAddedAction } from './actions/character';

interface State {
    map?: IMap;
}

class App extends React.Component<{}, State> {
    constructor() {
        super({});

        this.state = {};

        this.initMap();
        this.initCharacter();
    }

    initCharacter = () => {
        const character: ICharacter = {
            _id: 'abcde',
            position: { x: 1, y: 2 },
            direction: IDirection.LEFT,
        };
        store.dispatch(CharacterAddedAction(character));
    };

    initMap = async () => {
        const map = await loadMap('5b70253e3f64c2004bf0d24e');
        this.setState({
            ...this.state,
            map,
        });
    };

    render() {
        return <div>{!!this.state.map && <Map tiles={this.state.map.tiles} />}</div>;
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
