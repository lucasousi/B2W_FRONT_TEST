import { cloneDeep, isEqual } from 'lodash';
import { finalize } from 'rxjs/operators';

import { GetDetailedPokemonDTO, SummaryPokemon } from '../../entities/dtos';
import { PokemonViewModel } from '../../entities/view-models/pokemon.view-model';
import { toTitleCase } from '../../helpers';
import { API } from '../../service/service.factory';
import { addDetailedPokemonsToStore, detailedPokemonsStore } from './detailed-pokemon.store';

export interface DetailedPokemonService {
  getPokemonsDetailedInfo: (summarizedPokemons: SummaryPokemon[]) => void;
  convertDetailedPokemonToPokemonViewModel: (detailedPokemon: GetDetailedPokemonDTO) => PokemonViewModel;
}

export function useDetailedPokemonsService(): DetailedPokemonService {
  function getPokemonsDetailedInfo(summarizedPokemons: SummaryPokemon[]) {
    const _summarizedPokemons = summarizedPokemons;
    detailedPokemonsStore.setLoading(true);
    const urls = _summarizedPokemons.map((item) => item.pokemon.url);
    const requests = urls.map((url) => API.get<GetDetailedPokemonDTO>(url));
    const subscription = API.all<GetDetailedPokemonDTO>(requests)
      .pipe(
        finalize(() => {
          detailedPokemonsStore.setLoading(false);
          subscription.unsubscribe();
        })
      )
      .subscribe((responses) => {
        const { detailedPokemons: currentDetailedPokemons } = detailedPokemonsStore.getValue();
        const newDetailedPokemons = responses.map(({ data }) => data);
        const formattedNewDetailedPokemons = getFormattedDetailedPokemons(newDetailedPokemons, _summarizedPokemons);
        const currentDetailedPokemonsWithoutPrice = clearPriceFromDetailedPokemonsOnStorage(currentDetailedPokemons);
        if (!isEqual(formattedNewDetailedPokemons, currentDetailedPokemonsWithoutPrice)) {
          addDetailedPokemonsToStore(formattedNewDetailedPokemons);
        }
      });
  }

  function getFormattedDetailedPokemons(
    detailedPokemons: GetDetailedPokemonDTO[],
    summarizedPokemons: SummaryPokemon[]
  ) {
    return detailedPokemons.map((item) => {
      // Salvando consumo de memória no localstorage
      delete item.forms;
      delete item.held_items;
      delete item.game_indices;
      delete item.past_types;
      delete item.stats;
      delete item.types;

      item.name = toTitleCase(item.name);
      const detailedPokemonOnSummarizedList = summarizedPokemons.find(
        (summarizedPokemon) => summarizedPokemon.pokemon.name === item.name
      );
      item.price = detailedPokemonOnSummarizedList?.price || 0;
      return item;
    });
  }

  function convertDetailedPokemonToPokemonViewModel(detailedPokemon: GetDetailedPokemonDTO): PokemonViewModel {
    const { abilities, height, name, price, sprites, weight } = detailedPokemon;
    const _pokemonViewModel: PokemonViewModel = {
      abilities,
      height,
      name,
      price,
      sprites: { front_default: sprites.front_default },
      weight,
    };

    return _pokemonViewModel;
  }

  function clearPriceFromDetailedPokemonsOnStorage(detailedPokemons: GetDetailedPokemonDTO[]): GetDetailedPokemonDTO[] {
    const _detailedPokemons = cloneDeep(detailedPokemons);
    return _detailedPokemons.map((item) => {
      delete item.price;
      return item;
    });
  }

  return { getPokemonsDetailedInfo, convertDetailedPokemonToPokemonViewModel };
}
