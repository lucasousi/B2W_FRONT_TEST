import './aquamons-store-home.scss';

import { max, min } from 'lodash';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, Pagination, Skeleton } from '@material-ui/lab';
import { PokemonCard } from '@shared/components';
import {
    useDetailedPokemonsQuery, useDetailedPokemonsService, useSummarizedPokemonsQuery,
    useSummarizedPokemonsService
} from '@shared/data';
import { SummaryPokemon } from '@shared/entities/dtos';
import { PokemonViewModel } from '@shared/entities/view-models';

export const AquamonsStoreHome = () => {
  const aquaTypeID = 11;
  const pokemonsPerPage = 12;
  const fakeArrayToLoadingSkeleton = [...Array(pokemonsPerPage).keys()];
  const pageTitle = 'Loja de pokémons do tipo Água';

  const { getSummarizedPokemons } = useSummarizedPokemonsService();
  const { summarizedPokemons$ } = useSummarizedPokemonsQuery();
  const { getPokemonsDetailedInfo, convertDetailedPokemonToPokemonViewModel } = useDetailedPokemonsService();
  const { detailedPokemons$, isLoading$ } = useDetailedPokemonsQuery();

  const [isLoadingDetailedPokemons, setIsLoadingDetailedPokemons] = useState(false);
  const [summarizedPokemons, setSummarizedPokemons] = useState<SummaryPokemon[]>([]);
  const [formattedPokemons, setFormattedPokemons] = useState<PokemonViewModel[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<SummaryPokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const subscription1 = subscribeSummarizedPokemonsChanges();
    const subscription2 = subscribeDetailedPokemonsChanges();
    const subscription3 = subscribeIsLoadingDetailedPokemonsChanges();
    getSummarizedPokemons(aquaTypeID);

    return function cleanup(): void {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    };
  }, []);

  function subscribeSummarizedPokemonsChanges(): Subscription {
    return summarizedPokemons$.subscribe((value) => {
      setSummarizedPokemons(value);
      calcPageCount(value, pokemonsPerPage);
      if (value.length) {
        getPaginatedPokemons(value, currentPage);
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

  function getPaginatedPokemons(allPokemons: SummaryPokemon[], page: number): void {
    const fromRangeValue = (page - 1) * pokemonsPerPage;
    const toRangeValue = page * pokemonsPerPage;
    const _summarizedPokemons = allPokemons;

    // Útil quando usuário retorna de uma página maior para uma menor
    const startSliceValue = min([toRangeValue, fromRangeValue]);
    const endSliceValue = max([toRangeValue, fromRangeValue]);

    const paginatedSummarizedPokemons = _summarizedPokemons.slice(startSliceValue, endSliceValue);
    getPokemonsDetailedInfo(paginatedSummarizedPokemons);
  }

  function handleAutocompleteChange(value: SummaryPokemon[]) {
    const filteredSummarizedPokemons = value;
    const newCurrentPage = 1;
    setCurrentPage(newCurrentPage);
    if (filteredSummarizedPokemons.length) {
      setFilteredPokemons(filteredSummarizedPokemons);
      calcPageCount(value, pokemonsPerPage);
      getPaginatedPokemons(filteredSummarizedPokemons, newCurrentPage);
    } else {
      setFilteredPokemons([]);
      calcPageCount(summarizedPokemons, pokemonsPerPage);
      getPaginatedPokemons(summarizedPokemons, newCurrentPage);
    }
  }

  function calcPageCount(allPokemons: SummaryPokemon[], maxPokemonsPerPage: number): void {
    const newCurrentPage = 1;
    setCurrentPage(newCurrentPage);
    const _pageCount = Math.ceil(allPokemons.length / maxPokemonsPerPage);
    setPageCount(_pageCount);
  }

  function handlePageChange(newPageNumber: number): void {
    setCurrentPage(newPageNumber);
    const _pokemonsToPaginate = filteredPokemons?.length ? filteredPokemons : summarizedPokemons;
    getPaginatedPokemons(_pokemonsToPaginate, newPageNumber);
  }

  return (
    <section className="home-container container mx-auto px-5 py-10">
      <Grid container spacing={3} className="home-container__grid flex justify-center">
        <Grid item xs={12} className="home-container__title__subtitle">
          <h2 className="home-container__title lead-color">{pageTitle}</h2>
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

        <Grid item xs={12} className="flex justify-end">
          <Pagination page={currentPage} count={pageCount} onChange={(event, newPage) => handlePageChange(newPage)} />
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
                xl={4}
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
                xl={4}
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
