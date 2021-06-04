import './aquamons-store-home.scss';

import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { Grid } from '@material-ui/core';
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

  const { getSummarizedPokemons } = useSummarizedPokemonsService();
  const { summarizedPokemons$ } = useSummarizedPokemonsQuery();
  const { getPokemonsDetailedInfo, convertDetailedPokemonToPokemonViewModel } = useDetailedPokemonsService();
  const { detailedPokemons$ } = useDetailedPokemonsQuery();
  const [formattedPokemons, setFormattedPokemons] = useState<PokemonViewModel[]>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const subscription1 = subscribeSummarizedPokemonsChanges();
    const subscription2 = subscribeDetailedPokemonsChanges();
    getSummarizedPokemons(aquaTypeID);

    return function cleanup() {
      console.log('cleanup');
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    };
  }, []);

  function subscribeSummarizedPokemonsChanges(): Subscription {
    const subscription = summarizedPokemons$.subscribe((value) => {
      if (value.length) {
        getPaginatedPokemons(value, 0, currentPage);
      }
    });

    return subscription;
  }

  function subscribeDetailedPokemonsChanges(): Subscription {
    const subscription = detailedPokemons$.subscribe((value) => {
      if (value.length) {
        const _pokemonViewModel: PokemonViewModel[] = value.map((detailedPokemon) =>
          convertDetailedPokemonToPokemonViewModel(detailedPokemon)
        );

        setFormattedPokemons(_pokemonViewModel);
      }
    });

    return subscription;
  }

  function getPaginatedPokemons(allPokemons: SummaryPokemon[], currentPage: number, nextPage: number): void {
    const fromRangeValue = currentPage * pokemonsPerPage;
    const toRangeValue = nextPage * pokemonsPerPage;
    const _summarizedPokemons = allPokemons;

    const paginatedSummarizedPokemons = _summarizedPokemons.slice(fromRangeValue, toRangeValue);
    getPokemonsDetailedInfo(paginatedSummarizedPokemons);
  }

  return (
    <section className="home-container container mx-auto px-5 py-20">
      <Grid container spacing={3} className="home-container__grid flex justify-center">
        <Grid item xs={12} className="home-container__title__subtitle">
          <h2 className="lead-color">Loja de pokémons do tipo Água</h2>
          <span className="gray-color">Aqui você encontra os principais pokémons aquáticos para sua pokedéx.</span>
        </Grid>

        {formattedPokemons?.map((formattedPokemon, index) => (
          <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3} className="home-container__pokecard-container">
            <PokemonCard formattedPokemon={formattedPokemon} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default AquamonsStoreHome;
