import { cloneDeep, isEqual } from 'lodash';
import { finalize } from 'rxjs/operators';

import { GetDetailedPokemonDTO, SummaryPokemon } from '../../entities/dtos';
import { PokemonViewModel } from '../../entities/view-models/pokemon.view-model';
import { getLimitedRandonNumber, toTitleCase } from '../../helpers';
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
        const newDetailedPokemons = responses.map(({ data }) => data);
        const { detailedPokemons: currentDetailedPokemons } = detailedPokemonsStore.getValue();
        const currentDetailedPokemonsWithoutPrice = clearPriceFromDetailedPokemonsOnStorage(currentDetailedPokemons);
        if (!isEqual(newDetailedPokemons, currentDetailedPokemonsWithoutPrice)) {
          newDetailedPokemons.forEach((item) => {
            item.name = toTitleCase(item.name);
            const newDetailedPokemonOnSummarizedList = _summarizedPokemons.find(
              (summarizedPokemon) => summarizedPokemon.pokemon.name === item.name
            );
            item.price = newDetailedPokemonOnSummarizedList?.price || 0;
          });
          addDetailedPokemonsToStore(newDetailedPokemons);
        }
      });
  }

  function convertDetailedPokemonToPokemonViewModel(detailedPokemon: GetDetailedPokemonDTO): PokemonViewModel {
    const { abilities, height, moves, name, price, species, sprites, weight } = detailedPokemon;

    return {
      abilities,
      height,
      moves,
      name,
      price,
      species,
      sprites,
      weight,
    } as PokemonViewModel;
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
