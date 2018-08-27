import ICharacter from '../../../../shared/types/character';

export type PLAYER_CHARACTER_UPDATED = 'PLAYER_CHARACTER_UPDATED';
export const PLAYER_CHARACTER_UPDATED: PLAYER_CHARACTER_UPDATED = 'PLAYER_CHARACTER_UPDATED';

export type PLAYER_CHARACTER_ADDED = 'PLAYER_CHARACTER_ADDED';
export const PLAYER_CHARACTER_ADDED: PLAYER_CHARACTER_ADDED = 'PLAYER_CHARACTER_ADDED';

export type PlayerCharacterUpdatedAction = {
    type: PLAYER_CHARACTER_UPDATED;
    character: ICharacter;
};
export const PlayerCharacterUpdatedAction = (character: ICharacter): PlayerCharacterUpdatedAction => {
    return { type: PLAYER_CHARACTER_UPDATED, character };
};

export type PlayerCharacterAddedAction = {
    type: PLAYER_CHARACTER_ADDED;
    character: ICharacter;
};
export const PlayerCharacterAddedAction = (character: ICharacter): PlayerCharacterAddedAction => {
    return { type: PLAYER_CHARACTER_ADDED, character };
};
