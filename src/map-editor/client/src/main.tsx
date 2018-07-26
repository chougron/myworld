import * as React from 'react';
import { render } from 'react-dom';
import Map from './component/map';
import Tileset from './component/tileset';

class App extends React.Component {
    render() {
        //return <div>Bonjour</div>;
        return (
            <>
                <Map getCurrentTilesetCell={() => 1} />
                <Tileset />
            </>
        );
    }
}

render(<App />, document.getElementById('app'));
