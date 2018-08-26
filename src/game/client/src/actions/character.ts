import ICharacter from '../../../../shared/types/character';

export type CHARACTER_UPDATED = 'CHARACTER_UPDATED';
export const CHARACTER_UPDATED: CHARACTER_UPDATED = 'CHARACTER_UPDATED';

export type CHARACTER_ADDED = 'CHARACTER_ADDED';
export const CHARACTER_ADDED: CHARACTER_ADDED = 'CHARACTER_ADDED';

export type CharacterUpdatedAction = {
    type: CHARACTER_UPDATED;
    character: ICharacter;
};
export const CharacterUpdatedAction = (character: ICharacter): CharacterUpdatedAction => {
    return { type: CHARACTER_UPDATED, character };
};

export type CharacterAddedAction = {
    type: CHARACTER_ADDED;
    character: ICharacter;
};
export const CharacterAddedAction = (character: ICharacter): CharacterAddedAction => {
    return { type: CHARACTER_ADDED, character };
};
