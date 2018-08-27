import { createStore, Store, AnyAction } from 'redux';
import reducers from '../reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import ICharacter from '../../../../shared/types/character';

export type State = {
    characters: ICharacter[];
    player: {
        character: ICharacter;
    };
};

const store: Store<State, AnyAction> = createStore(reducers, devToolsEnhancer({}));

export default store;
