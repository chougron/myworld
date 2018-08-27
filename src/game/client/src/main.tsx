import * as React from 'react';
import { render } from 'react-dom';
import IMap from '../../../shared/types/map';
import { loadMap } from './service/map';
import Map from './component/map';
import KeyboardManager from './component/keyboardManager';
import ICharacter from '../../../shared/types/character';
import IDirection from '../../../shared/types/direction';
import { Provider } from 'react-redux';
import store from './store';
import { PlayerCharacterAddedAction } from './actions/player';
import { moveCharacter } from './service/character';

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
            direction: IDirection.BOTTOM,
            moving: false,
        };
        store.dispatch(PlayerCharacterAddedAction(character));
    };

    initMap = async () => {
        const map = await loadMap('5b70253e3f64c2004bf0d24e');
        this.setState({
            ...this.state,
            map,
        });
    };

    render() {
        return (
            <>
                {!!this.state.map && <Map tiles={this.state.map.tiles} />}
                <KeyboardManager />
            </>
        );
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
