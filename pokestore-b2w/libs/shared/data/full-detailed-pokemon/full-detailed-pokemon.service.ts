import { finalize } from 'rxjs/operators';

import { GetDetailedPokemonDTO } from '../../entities/dtos';
import { toTitleCase } from '../../helpers';
import { API } from '../../service/service.factory';
import {
    fullDetailedPokemonStore, setFullDetailedPokemonToStore
} from './full-detailed-pokemon.store';

export interface FullDetailedPokemonService {
  getFullPokemonDetailedInfo: (pokemonID: number | string) => void;
}

export function useFullDetailedPokemonService(): FullDetailedPokemonService {
  function getFullPokemonDetailedInfo(pokemonID: number | string) {
    fullDetailedPokemonStore.setLoading(true);
    const subscription = API.get<GetDetailedPokemonDTO>(`pokemon/${pokemonID}`)
      .pipe(
        finalize(() => {
          fullDetailedPokemonStore.setLoading(false);
          subscription.unsubscribe();
        })
      )
      .subscribe(({ data }) => {
        let _fullDetailedPokemon = data;
        _fullDetailedPokemon.name = toTitleCase(_fullDetailedPokemon.name);
        setFullDetailedPokemonToStore(_fullDetailedPokemon);
      });
  }

  return { getFullPokemonDetailedInfo };
}
