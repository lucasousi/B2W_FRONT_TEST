import { createEntityStore } from '@datorama/akita';

import { SummaryPokemon } from '../../entities/dtos';

export interface SummaryPokemonState {
  summarizedPokemons: SummaryPokemon[];
}

function getInitialState(): SummaryPokemonState {
  return { summarizedPokemons: [] };
}

export const summarizedPokemonsStore = createEntityStore<SummaryPokemonState>(
  getInitialState(),
  { name: 'summarized-pokemons', idKey: 'entityID' }
);
