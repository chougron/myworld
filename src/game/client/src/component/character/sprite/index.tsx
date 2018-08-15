import * as React from 'react';
import Image from '../../../../../../shared/medias/sprite.png';

export enum Position {
    BOTTOM = 0,
    LEFT = 1,
    RIGHT = 2,
    TOP = 3,
}

interface Props {
    position: Position;
}

class Sprite extends React.Component<Props> {
    static WIDTH = 32;
    static HEIGHT = 48;

    render() {
        const image = Image;
        const backgroundImage = `url(${image})`;
        const backgroundPositionX = 0;
        const backgroundPositionY = -Sprite.HEIGHT * this.props.position;
        const width = Sprite.WIDTH;
        const height = Sprite.HEIGHT;
        const zIndex = 10000;
        const position = 'absolute';
        const boxSizing = 'border-box';

        return (
            <div
                style={{
                    position,
                    width,
                    height,
                    backgroundPositionX,
                    backgroundPositionY,
                    backgroundImage,
                    zIndex,
                    boxSizing,
                }}
            />
        );
    }
}

export default Sprite;
