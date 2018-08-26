import ICharacter from '../../../../shared/types/character';
import { OtherAction } from '../actions';
import { CharacterUpdatedAction, CHARACTER_UPDATED, CHARACTER_ADDED, CharacterAddedAction } from '../actions/character';

export type State = ICharacter[];

export const initialState: State = [];

const handleCharacterUpdated = (state: State, character: ICharacter): State => {
    const newState = state.map((element: ICharacter) => {
        if (element._id === character._id) {
            return character;
        }
        return element;
    });
    return newState;
};

const handleCharacterAdded = (state: State, character: ICharacter): State => {
    const newState = [...state, character];

    return newState;
};

type Action = OtherAction | CharacterUpdatedAction | CharacterAddedAction;

const characterReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case CHARACTER_UPDATED:
            return handleCharacterUpdated(state, action.character);
        case CHARACTER_ADDED:
            return handleCharacterAdded(state, action.character);
        default:
            return state;
    }
};

export default characterReducer;
