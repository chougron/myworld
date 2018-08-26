import { combineReducers } from 'redux';
import characters from './character';
import ICharacter from '../../../../shared/types/character';

export type State = {
    characters: ICharacter[];
};

const reducers = combineReducers({ characters });

export default reducers;
