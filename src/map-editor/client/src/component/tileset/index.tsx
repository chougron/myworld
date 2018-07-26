import * as React from 'react';
import './style.css';
import Image from '../../../../../shared/medias/tileset.png';

class Tileset extends React.Component {
    render() {
        return (
            <div id="tileset">
                <img src={Image} />
            </div>
        );
    }
}

export default Tileset;
