import { combineReducers } from 'redux';
import characters from './character';
import player from './player';

const reducers = combineReducers({ characters, player });

export default reducers;
