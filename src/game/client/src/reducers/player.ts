import ICharacter from '../../../../shared/types/character';
import { OtherAction } from '../actions';
import {
    PlayerCharacterUpdatedAction,
    PLAYER_CHARACTER_UPDATED,
    PLAYER_CHARACTER_ADDED,
    PlayerCharacterAddedAction,
} from '../actions/player';

export type State = {
    character: ICharacter;
};

export const initialState: State = {
    character: null,
};

const handlePlayerCharacterUpdated = (state: State, character: ICharacter): State => {
    const newCharacter = Object.assign({}, character);
    const newState = {
        ...state,
        character: newCharacter,
    };
    return newState;
};

const handlePlayerCharacterAdded = (state: State, character: ICharacter): State => {
    const newCharacter = Object.assign({}, character);
    const newState = {
        ...state,
        character: newCharacter,
    };
    return newState;
};

type Action = OtherAction | PlayerCharacterUpdatedAction | PlayerCharacterAddedAction;

const playerReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case PLAYER_CHARACTER_UPDATED:
            return handlePlayerCharacterUpdated(state, action.character);
        case PLAYER_CHARACTER_ADDED:
            return handlePlayerCharacterAdded(state, action.character);
        default:
            return state;
    }
};

export default playerReducer;
