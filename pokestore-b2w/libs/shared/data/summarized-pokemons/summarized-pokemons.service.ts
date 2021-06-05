import { isEqual } from 'lodash';
import { finalize } from 'rxjs/operators';

import { GetPokemonByTypeDTO } from '../../entities/dtos/get-pokemon-by-type.dto';
import { toTitleCase } from '../../helpers';
import { API } from '../../service/service.factory';
import { summarizedPokemonsStore } from './summarized-pokemons.store';

export interface SummarizedPokemonsService {
  getSummarizedPokemons: (pokemonTypeID: number) => void;
}

export function useSummarizedPokemonsService(): SummarizedPokemonsService {
  function getSummarizedPokemons(pokemonTypeID: number): void {
    summarizedPokemonsStore.setLoading(true);
    const { summarizedPokemons: currentState } = summarizedPokemonsStore.getValue();
    const subscription = API.get<GetPokemonByTypeDTO>(`type/${pokemonTypeID}`)
      .pipe(
        finalize(() => {
          summarizedPokemonsStore.setLoading(false);
          subscription.unsubscribe();
        })
      )
      .subscribe(({ data: { pokemon } }) => {
        if (!isEqual(pokemon, currentState)) {
          const _pokemon = pokemon;
          _pokemon.forEach((item) => (item.pokemon.name = toTitleCase(item.pokemon.name)));
          summarizedPokemonsStore.update({
            summarizedPokemons: _pokemon,
          });
        }
      });
  }

  return { getSummarizedPokemons };
}
