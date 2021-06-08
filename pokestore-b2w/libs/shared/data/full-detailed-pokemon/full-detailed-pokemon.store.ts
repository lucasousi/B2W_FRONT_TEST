import { createEntityStore } from '@datorama/akita';

import { GetDetailedPokemonDTO } from '../../entities/dtos';

export interface FullDetailedPokemonState {
  fullDetailedPokemon: GetDetailedPokemonDTO | Partial<GetDetailedPokemonDTO>;
}

function getInitialState(): FullDetailedPokemonState {
  return { fullDetailedPokemon: {} };
}

export const fullDetailedPokemonStore = createEntityStore<FullDetailedPokemonState>(getInitialState(), {
  name: 'full-detailed-pokemon',
  idKey: 'entityID',
});

export function setFullDetailedPokemonToStore(newFullDetailedPokemon: GetDetailedPokemonDTO) {
  fullDetailedPokemonStore.update({
    fullDetailedPokemon: newFullDetailedPokemon,
  } as FullDetailedPokemonState);
}
