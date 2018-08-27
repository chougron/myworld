import store from '../store';
import IDirection from '../../../../shared/types/direction';
import { moveCharacter } from './character';

const movePlayerCharacter = (direction: IDirection): void => {
    const state = store.getState();
    if (state.player.character.moving) {
        return;
    }

    moveCharacter(state.player.character, direction, true);
};

export { movePlayerCharacter };
