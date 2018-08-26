import * as React from 'react';
import Image from '../../../../../../shared/medias/sprite.png';
import IDirection from '../../../../../../shared/types/direction';

interface Props {
    direction: IDirection;
    moving?: boolean;
}

interface State {
    step: number;
}

class Sprite extends React.Component<Props, State> {
    static WIDTH = 32;
    static HEIGHT = 48;
    static MAX_STEP = 4;

    timer: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            step: 0,
        };

        this.timer = setInterval(this.tick, 150);
    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    render() {
        const image = Image;
        const backgroundImage = `url(${image})`;
        const backgroundPositionX = this.getBackGroundPositionX();
        const backgroundPositionY = -Sprite.HEIGHT * this.props.direction;
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

    getBackGroundPositionX = (): number => {
        if (!this.props.moving) {
            return 0;
        }

        return -Sprite.WIDTH * this.state.step;
    };

    tick = (): void => {
        let step = this.props.moving ? (this.state.step + 1) % Sprite.MAX_STEP : 0;
        this.setState({
            ...this.state,
            step,
        });
    };
}

export default Sprite;
