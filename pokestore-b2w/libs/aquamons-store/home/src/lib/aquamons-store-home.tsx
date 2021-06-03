import './aquamons-store-home.scss';

import { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import { PokemonCard } from '@shared/components';
import { GetPokemonByTypeDTO, SummaryPokemon } from '@shared/entities/dtos';
import { getLimitedRandonNumber } from '@shared/helpers';
import { API } from '@shared/service';

export const AquamonsStoreHome = () => {
  const [summarizedPokemons, setSummarizedPokemons] = useState<
    SummaryPokemon[]
  >([]);

  const [
    paginatedSummarizedPokemons,
    setPaginatedSummarizedPokemons,
  ] = useState<SummaryPokemon[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const aquaTypeID = 11;
  const pokemonsPerPage = 12;

  useEffect(() => {
    getAquaPokemons();
  }, []);

  useEffect(() => {
    getPaginatedPokemons(0, currentPage);
  }, [summarizedPokemons]);

  async function getAquaPokemons(): Promise<void> {
    try {
      const {
        data: { pokemon },
      } = await API.get<GetPokemonByTypeDTO>(`type/${aquaTypeID}`);

      pokemon.forEach(
        (item) => (item.price = getLimitedRandonNumber(100, 1000))
      );

      setSummarizedPokemons(pokemon?.length ? pokemon : []);
    } catch (ex) {
      console.error(ex);
    }
  }

  function getPaginatedPokemons(currentPage: number, nextPage: number): void {
    const fromRangeValue = currentPage * pokemonsPerPage;
    const toRangeValue = nextPage * pokemonsPerPage;
    const _summarizedPokemons = summarizedPokemons;

    const paginatedSummarizedPokemons = _summarizedPokemons.slice(
      fromRangeValue,
      toRangeValue
    );

    setPaginatedSummarizedPokemons(paginatedSummarizedPokemons);
  }

  return (
    <section className="home-container container mx-auto px-5 py-20">
      <Grid
        container
        spacing={3}
        className="home-container__grid flex justify-center"
      >
        <Grid item xs={12} className="home-container__title__subtitle">
          <h2 className="lead-color">Loja de pokémons do tipo Água</h2>
          <span className="gray-color">
            Aqui você encontra os principais pokémons aquáticos para sua
            pokedéx.
          </span>
        </Grid>

        {paginatedSummarizedPokemons.map((summaryPokemon, index) => (
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
            <PokemonCard summaryPokemon={summaryPokemon} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default AquamonsStoreHome;
