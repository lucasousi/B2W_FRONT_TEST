import { createEntityStore } from '@datorama/akita';

import { GetDetailedPokemonDTO } from '../../entities/dtos';

export interface DetailedPokemonState {
  detailedPokemons: GetDetailedPokemonDTO[];
}

function getInitialState(): DetailedPokemonState {
  return { detailedPokemons: [] };
}

export const detailedPokemonsStore = createEntityStore<DetailedPokemonState>(getInitialState(), {
  name: 'detailed-pokemons',
  idKey: 'entityID',
});

export function addDetailedPokemonsToStore(newDetailedPokemons: GetDetailedPokemonDTO[]) {
  detailedPokemonsStore.update({
    detailedPokemons: [...newDetailedPokemons],
  });
}
