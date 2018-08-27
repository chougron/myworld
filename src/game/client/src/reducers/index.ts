import { combineReducers } from 'redux';
import characters from './character';
import player from './player';
import ICharacter from '../../../../shared/types/character';

export type State = {
    characters: ICharacter[];
    player: {
        character: ICharacter;
    };
};

const reducers = combineReducers({ characters, player });

export default reducers;
