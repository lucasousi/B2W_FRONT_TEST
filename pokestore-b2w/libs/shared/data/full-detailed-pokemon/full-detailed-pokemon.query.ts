import { Observable } from 'rxjs';

import { createEntityQuery, QueryEntity } from '@datorama/akita';

import { GetDetailedPokemonDTO } from '../../entities/dtos';
import { FullDetailedPokemonState, fullDetailedPokemonStore } from './full-detailed-pokemon.store';

export interface FullDetailedPokemonQuery {
  fullDetailedPokemonQuery: QueryEntity<FullDetailedPokemonState, unknown, unknown>;
  isLoading$: Observable<boolean>;
  fullDetailedPokemon$: Observable<Partial<GetDetailedPokemonDTO>>;
}

export function useFullDetailedPokemonQuery(): FullDetailedPokemonQuery {
  const fullDetailedPokemonQuery = createEntityQuery<FullDetailedPokemonState>(fullDetailedPokemonStore);
  const isLoading$: Observable<boolean> = fullDetailedPokemonQuery.selectLoading();
  const fullDetailedPokemon$ = fullDetailedPokemonQuery.select('fullDetailedPokemon');

  return { fullDetailedPokemonQuery, isLoading$, fullDetailedPokemon$ };
}
