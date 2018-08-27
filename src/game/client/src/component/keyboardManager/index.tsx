import * as React from 'react';
import { movePlayerCharacter } from '../../service/player';
import IDirection from '../../../../../shared/types/direction';

class KeyboardManager extends React.Component {
    constructor() {
        super({});
        document.onkeydown = this.keydown;
    }

    render() {
        return <></>;
    }

    keydown = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowDown':
                movePlayerCharacter(IDirection.BOTTOM);
            case 'ArrowUp':
                movePlayerCharacter(IDirection.TOP);
            case 'ArrowLeft':
                movePlayerCharacter(IDirection.LEFT);
            case 'ArrowRight':
                movePlayerCharacter(IDirection.RIGHT);
        }
        console.log(event);
    };
}

export default KeyboardManager;
