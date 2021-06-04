import { finalize } from 'rxjs/operators';

import { getLimitedRandonNumber } from '@shared/helpers';

import { GetPokemonByTypeDTO } from '../../entities/dtos/get-pokemon-by-type.dto';
import { API } from '../../service/service.factory';
import { summarizedPokemonsStore } from './summarized-pokemons.store';

export interface SummarizedPokemonsService {
  getSummarizedPokemons: (pokemonTypeID: number) => void;
}

export function useSummarizedPokemonsService(): SummarizedPokemonsService {
  function getSummarizedPokemons(pokemonTypeID: number): void {
    summarizedPokemonsStore.setLoading(true);
    const subscription = API.get<GetPokemonByTypeDTO>(`type/${pokemonTypeID}`)
      .pipe(
        finalize(() => {
          summarizedPokemonsStore.setLoading(false);
          subscription.unsubscribe();
        })
      )
      .subscribe(({ data: { pokemon } }) => {
        summarizedPokemonsStore.update({
          summarizedPokemons: pokemon,
        });
      });
  }

  return { getSummarizedPokemons };
}
