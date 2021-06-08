import { Observable } from 'rxjs';

import { createEntityQuery, QueryEntity } from '@datorama/akita';

import { GetDetailedPokemonDTO } from '../../entities/dtos';
import { detailedPokemonsStore, DetailedPokemonState } from './detailed-pokemon.store';

export interface DetailedPokemonsQuery {
  detailedPokemonsQuery: QueryEntity<DetailedPokemonState, unknown, unknown>;
  isLoading$: Observable<boolean>;
  detailedPokemons$: Observable<GetDetailedPokemonDTO[]>;
}

export function useDetailedPokemonsQuery(): DetailedPokemonsQuery {
  const detailedPokemonsQuery = createEntityQuery<DetailedPokemonState>(
    detailedPokemonsStore
  );
  const isLoading$: Observable<boolean> = detailedPokemonsQuery.selectLoading();
  const detailedPokemons$ = detailedPokemonsQuery.select('detailedPokemons');

  return { detailedPokemonsQuery, isLoading$, detailedPokemons$ };
}
