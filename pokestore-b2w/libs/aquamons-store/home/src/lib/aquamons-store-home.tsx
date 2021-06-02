import './aquamons-store-home.scss';

import { useEffect, useState } from 'react';

import { GetPokemonByTypeDTO, SummaryPokemon } from '@shared/entities/dtos';
import { API } from '@shared/service';

export const AquamonsStoreHome = () => {
  const [summarizedPokemons, setSummarizedPokemons] = useState<
    SummaryPokemon[]
  >([]);
  const [pokemons, setPokemons] = useState([]);
  const aquaTypeID = 11;

  useEffect(() => {
    getAquaPokemons();
  }, []);

  async function getAquaPokemons(): Promise<void> {
    try {
      const {
        data: { pokemon },
      } = await API.get<GetPokemonByTypeDTO>(`type/${aquaTypeID}`);

      setSummarizedPokemons(pokemon);
    } catch (ex) {
      console.error(ex);
    }
  }

  return <section className="home-container">asd</section>;
};

export default AquamonsStoreHome;
