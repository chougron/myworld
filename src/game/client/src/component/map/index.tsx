import * as React from 'react';
import ITile from '../../../../../shared/types/tile';
import Tile from '../tile';
import './style.css';
import ICharacter from '../../../../../shared/types/character';
import Character from '../character';
import { State } from '../../store';
import { connect } from 'react-redux';

interface Props extends StateProps {
    tiles: ITile[][];
}

interface StateProps {
    characters: ICharacter[];
    playerCharacter: ICharacter;
}

class Map extends React.Component<Props> {
    render() {
        return (
            <div id="map">
                <div id="map-layer">
                    {this.props.playerCharacter && <Character character={this.props.playerCharacter} />}
                    {this.props.characters.map((character: ICharacter) => <Character character={character} />)}
                    {this.props.tiles.map((tiles: ITile[], index: number) =>
                        tiles.map((tile: ITile, key: number) => <Tile tile={tile} layer={index} key={key} />),
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State, props: Props): StateProps => {
    return {
        characters: state.characters,
        playerCharacter: state.player.character,
    };
};

export default connect<StateProps, {}>(
    mapStateToProps,
    {},
)(Map);
