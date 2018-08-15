import * as React from 'react';
import ITile from '../../../../../shared/types/tile';
import Tile from '../tile';
import './style.css';
import ICharacter from '../../../../../shared/types/character';
import Character from '../character';

interface Props {
    tiles: ITile[][];
    characters: ICharacter[];
}

class Map extends React.Component<Props> {
    render() {
        return (
            <div id="map">
                <div id="map-layer">
                    {this.props.characters.map((character: ICharacter) => <Character character={character} />)}
                    {this.props.tiles.map((tiles: ITile[], index: number) =>
                        tiles.map((tile: ITile, key: number) => <Tile tile={tile} layer={index} key={key} />),
                    )}
                </div>
            </div>
        );
    }
}

export default Map;
