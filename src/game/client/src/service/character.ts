import ICharacter from '../../../../shared/types/character';
import IDirection from '../../../../shared/types/direction';
import ICoordinates from '../../../../shared/types/coordinates';
import store from '../store';
import { CharacterUpdatedAction } from '../actions/character';
import { PlayerCharacterUpdatedAction } from '../actions/player';

const sleep = (duration: number): Promise<void> => new Promise(resolve => setTimeout(resolve, duration));

/**
 * Move a character to a given direction
 * @param character
 * @param direction
 */
const moveCharacter = async (
    character: ICharacter,
    direction: IDirection,
    playerCharacter?: boolean,
): Promise<void> => {
    // Set the character as moving
    character.direction = direction;
    character.moving = true;
    updateCharacter(character, playerCharacter);

    // Move the character steps by steps
    const steps = 10;
    const move = getMovingFunction(direction, steps);
    for (let i = 0; i < 10; i++) {
        await sleep(50);
        character.position = move(character.position);
        updateCharacter(character, playerCharacter);
    }

    // Set the character as not moving
    character.position = roundPosition(character.position);
    character.moving = false;
    updateCharacter(character, playerCharacter);
};

/**
 * Update a character
 * @param character
 * @param playerCharacter
 */
const updateCharacter = (character: ICharacter, playerCharacter: boolean): void => {
    const newCharacter = Object.assign({}, character);
    if (playerCharacter) {
        store.dispatch(PlayerCharacterUpdatedAction(newCharacter));
    } else {
        store.dispatch(CharacterUpdatedAction(newCharacter));
    }
};

/**
 * Round the position to the closest integer
 * @param position
 */
const roundPosition = (position: ICoordinates): ICoordinates => {
    const newPosition = Object.assign({}, position);
    newPosition.x = Math.round(position.x);
    newPosition.y = Math.round(position.y);
    return newPosition;
};

/**
 * Get a moving function depending of the direction and the number of steps
 * @param direction
 * @param steps
 */
const getMovingFunction = (direction: IDirection, steps: number): ((position: ICoordinates) => ICoordinates) => {
    const step = 1 / steps;
    let move: (position: ICoordinates) => ICoordinates;
    switch (direction) {
        case IDirection.BOTTOM:
            move = position => {
                const newPosition = Object.assign({}, position);
                newPosition.y += step;
                return newPosition;
            };
            break;
        case IDirection.LEFT:
            move = position => {
                const newPosition = Object.assign({}, position);
                newPosition.x -= step;
                return newPosition;
            };
            break;
        case IDirection.RIGHT:
            move = position => {
                const newPosition = Object.assign({}, position);
                newPosition.x += step;
                return newPosition;
            };
            break;
        case IDirection.TOP:
            move = position => {
                const newPosition = Object.assign({}, position);
                newPosition.y -= step;
                return newPosition;
            };
    }
    return move;
};

export { moveCharacter };
