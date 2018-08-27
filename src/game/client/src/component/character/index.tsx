import * as React from 'react';
import Sprite from './sprite';
import ICharacter from '../../../../../shared/types/character';
import Tile from '../tile';

interface Props {
    character: ICharacter;
}

class Character extends React.Component<Props> {
    render() {
        const top = this.props.character.position.y * Tile.SIZE - Tile.SIZE / 2;
        const left = this.props.character.position.x * Tile.SIZE;
        const position = 'absolute';

        return (
            <div style={{ top, left, position }}>
                <Sprite direction={this.props.character.direction} moving={this.props.character.moving} />
            </div>
        );
    }
}

export default Character;
