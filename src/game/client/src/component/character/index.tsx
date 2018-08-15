import * as React from 'react';
import Sprite, { Position } from './sprite';
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
                <Sprite position={Position.BOTTOM} />
            </div>
        );
    }
}

export default Character;