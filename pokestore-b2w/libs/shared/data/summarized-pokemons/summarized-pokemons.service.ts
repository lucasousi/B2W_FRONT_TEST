import { cloneDeep, isEqual } from 'lodash';
import { finalize } from 'rxjs/operators';

import { GetPokemonByTypeDTO } from '../../entities/dtos/get-pokemon-by-type.dto';
import { SummaryPokemon } from '../../entities/dtos/summary-pokemon';
import { getLimitedRandonNumber, toTitleCase } from '../../helpers';
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
      .subscribe(({ data: { pokemon: summarizedPokemonsData } }) => {
        const currentSummarizedPokemonsState = getCurrentSummarizedPokemonsState(summarizedPokemonsStore);
        const pokemonsDataWithTitleCaseOnName = getSummarizedPokemonsWithTitleCaseOnName(summarizedPokemonsData);
        const currentSummarizedPokemonsStateWithoutPrice = getSummarizedPokemonsWithoutPrice(
          currentSummarizedPokemonsState
        );

        if (!isEqual(pokemonsDataWithTitleCaseOnName, currentSummarizedPokemonsStateWithoutPrice)) {
          summarizedPokemonsStore.update({
            summarizedPokemons: getSummarizedPokemonsWithPrice(pokemonsDataWithTitleCaseOnName),
          });
        }
      });
  }

  function getCurrentSummarizedPokemonsState(store) {
    const { summarizedPokemons: currentSummarizedPokemonsState } = store.getValue();
    return currentSummarizedPokemonsState;
  }

  function getSummarizedPokemonsWithTitleCaseOnName(summarizedPokemons: SummaryPokemon[]) {
    return summarizedPokemons.map((item) => {
      item.pokemon.name = toTitleCase(item.pokemon.name);
      return item;
    });
  }

  function getSummarizedPokemonsWithPrice(summarizedPokemons: SummaryPokemon[]) {
    return summarizedPokemons.map((item) => {
      item.price = getLimitedRandonNumber(100, 1000);
      return item;
    });
  }

  function getSummarizedPokemonsWithoutPrice(summarizedPokemons: SummaryPokemon[]): SummaryPokemon[] {
    const _summarizedPokemons = cloneDeep(summarizedPokemons);
    return _summarizedPokemons.map((item) => {
      delete item.price;
      return item;
    });
  }

  return { getSummarizedPokemons };
}
