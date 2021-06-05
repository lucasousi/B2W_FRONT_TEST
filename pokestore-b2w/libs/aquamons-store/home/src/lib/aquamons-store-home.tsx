import './aquamons-store-home.scss';

import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { Chip, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, Skeleton } from '@material-ui/lab';
import { PokemonCard } from '@shared/components';
import {
    useDetailedPokemonsQuery, useDetailedPokemonsService, useSummarizedPokemonsQuery,
    useSummarizedPokemonsService
} from '@shared/data';
import { SummaryPokemon } from '@shared/entities/dtos';
import { PokemonViewModel } from '@shared/entities/view-models';

export const AquamonsStoreHome = () => {
  const aquaTypeID = 11;
  const pokemonsPerPage = 16;
  const fakeArrayToLoadingSkeleton = [...Array(pokemonsPerPage).keys()];

  const { getSummarizedPokemons } = useSummarizedPokemonsService();
  const { summarizedPokemons$ } = useSummarizedPokemonsQuery();
  const { getPokemonsDetailedInfo, convertDetailedPokemonToPokemonViewModel } = useDetailedPokemonsService();
  const { detailedPokemons$, isLoading$ } = useDetailedPokemonsQuery();

  const [isLoadingDetailedPokemons, setIsLoadingDetailedPokemons] = useState(false);
  const [summarizedPokemons, setSummarizedPokemons] = useState<SummaryPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<SummaryPokemon[]>([]);
  const [formattedPokemons, setFormattedPokemons] = useState<PokemonViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const subscription1 = subscribeSummarizedPokemonsChanges();
    const subscription2 = subscribeDetailedPokemonsChanges();
    const subscription3 = subscribeIsLoadingDetailedPokemonsChanges();
    getSummarizedPokemons(aquaTypeID);

    return function cleanup() {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    };
  }, []);

  function subscribeSummarizedPokemonsChanges(): Subscription {
    return summarizedPokemons$.subscribe((value) => {
      setSummarizedPokemons(value);
      if (value.length) {
        getPaginatedPokemons(value, 0, currentPage);
      }
    });
  }

  function subscribeDetailedPokemonsChanges(): Subscription {
    return detailedPokemons$.subscribe((value) => {
      if (value.length) {
        const _pokemonViewModel: PokemonViewModel[] = value.map((detailedPokemon) =>
          convertDetailedPokemonToPokemonViewModel(detailedPokemon)
        );

        setFormattedPokemons(_pokemonViewModel);
      }
    });
  }

  function subscribeIsLoadingDetailedPokemonsChanges(): Subscription {
    return isLoading$.subscribe((value) => {
      setIsLoadingDetailedPokemons(value);
    });
  }

  function getPaginatedPokemons(allPokemons: SummaryPokemon[], currentPage: number, nextPage: number): void {
    const fromRangeValue = currentPage * pokemonsPerPage;
    const toRangeValue = nextPage * pokemonsPerPage;
    const _summarizedPokemons = allPokemons;

    const paginatedSummarizedPokemons = _summarizedPokemons.slice(fromRangeValue, toRangeValue);
    getPokemonsDetailedInfo(paginatedSummarizedPokemons);
  }

  function handleAutocompleteChange(value: SummaryPokemon[]) {
    const selectedSummarizedPokemons = value;
    const newCurrentPage = 1;
    setCurrentPage(newCurrentPage);
    if (selectedSummarizedPokemons.length) {
      getPaginatedPokemons(selectedSummarizedPokemons, 0, newCurrentPage);
    } else {
      getPaginatedPokemons(summarizedPokemons, 0, newCurrentPage);
    }
  }

  return (
    <section className="home-container container mx-auto px-5 py-10">
      <Grid container spacing={3} className="home-container__grid flex justify-center">
        <Grid item xs={12} className="home-container__title__subtitle">
          <h2 className="lead-color">Loja de pokémons do tipo Água</h2>
          <span className="gray-color">Aqui você encontra os principais pokémons aquáticos para sua pokedéx.</span>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            className="home-container__search-bar"
            noOptionsText="Nenhum pokémon encontrado"
            options={summarizedPokemons}
            getOptionLabel={(option) => option.pokemon.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pesquisar pokémons pelo nome"
                variant="outlined"
                placeholder="Pesquise pelo nome de um pókemon específico..."
              />
            )}
            onChange={(event, value) => handleAutocompleteChange(value)}
          />
        </Grid>

        {isLoadingDetailedPokemons
          ? fakeArrayToLoadingSkeleton.map((fakeValue, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="home-container__pokecard-container"
              >
                <Skeleton key={index} variant="rect" height={212} />
              </Grid>
            ))
          : formattedPokemons?.map((formattedPokemon, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="home-container__pokecard-container"
              >
                <PokemonCard formattedPokemon={formattedPokemon} />
              </Grid>
            ))}
      </Grid>
    </section>
  );
};

export default AquamonsStoreHome;
