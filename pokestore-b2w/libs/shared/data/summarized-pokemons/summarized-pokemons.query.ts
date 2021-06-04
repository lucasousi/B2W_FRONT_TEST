import { Observable } from 'rxjs';

import { createEntityQuery, QueryEntity } from '@datorama/akita';

import { SummaryPokemon } from '../../entities/dtos';
import { summarizedPokemonsStore, SummaryPokemonState } from './summarized-pokemons.store';

export interface SummarizedPokemonsQuery {
  summarizedPokemonsQuery: QueryEntity<SummaryPokemonState, unknown, unknown>;
  isLoading$: Observable<boolean>;
  summarizedPokemons$: Observable<SummaryPokemon[]>;
}

export function useSummarizedPokemonsQuery(): SummarizedPokemonsQuery {
  const summarizedPokemonsQuery = createEntityQuery<SummaryPokemonState>(
    summarizedPokemonsStore
  );
  const isLoading$: Observable<boolean> = summarizedPokemonsQuery.selectLoading();
  const summarizedPokemons$ = summarizedPokemonsQuery.select(
    'summarizedPokemons'
  );

  return { summarizedPokemonsQuery, isLoading$, summarizedPokemons$ };
}
