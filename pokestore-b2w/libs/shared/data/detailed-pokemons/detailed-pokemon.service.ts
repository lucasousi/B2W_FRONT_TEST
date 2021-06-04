import { isEqual } from 'lodash';
import { finalize } from 'rxjs/operators';

import { GetDetailedPokemonDTO, SummaryPokemon } from '@shared/entities/dtos';
import { PokemonViewModel } from '@shared/entities/view-models';
import { getLimitedRandonNumber } from '@shared/helpers';

import { API } from '../../service/service.factory';
import { addDetailedPokemonsToStore, detailedPokemonsStore } from './detailed-pokemon.store';

export interface DetailedPokemonService {
  getPokemonsDetailedInfo: (summarizedPokemons: SummaryPokemon[]) => void;
  convertDetailedPokemonToPokemonViewModel: (detailedPokemon: GetDetailedPokemonDTO) => PokemonViewModel;
}

export function useDetailedPokemonsService(): DetailedPokemonService {
  function getPokemonsDetailedInfo(summarizedPokemons: SummaryPokemon[]) {
    detailedPokemonsStore.setLoading(true);
    const { detailedPokemons: currentState } = detailedPokemonsStore.getValue();
    const urls = summarizedPokemons.map((item) => item.pokemon.url);
    const requests = urls.map((url) => API.get<GetDetailedPokemonDTO>(url));
    const subscription = API.all<GetDetailedPokemonDTO>(requests)
      .pipe(
        finalize(() => {
          detailedPokemonsStore.setLoading(false);
          subscription.unsubscribe();
        })
      )
      .subscribe((responses) => {
        const _detailedPokemons = responses.map((resp) => resp.data);
        if (!isEqual(_detailedPokemons, currentState)) {
          addDetailedPokemonsToStore(_detailedPokemons);
        }
      });
  }

  function convertDetailedPokemonToPokemonViewModel(detailedPokemon: GetDetailedPokemonDTO): PokemonViewModel {
    return {
      abilities: detailedPokemon.abilities,
      height: detailedPokemon.height,
      moves: detailedPokemon.moves,
      name: detailedPokemon.name,
      price: getLimitedRandonNumber(100, 1000),
      species: detailedPokemon.species,
      sprites: detailedPokemon.sprites,
      weight: detailedPokemon.weight,
    } as PokemonViewModel;
  }

  return { getPokemonsDetailedInfo, convertDetailedPokemonToPokemonViewModel };
}
