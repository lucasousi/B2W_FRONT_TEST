import './pokemon-detail.scss';

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Subscription } from 'rxjs';

import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import {
    useDetailedPokemonsService, useFullDetailedPokemonQuery, useFullDetailedPokemonService
} from '@shared/data';
import { GetDetailedPokemonDTO } from '@shared/entities/dtos';
import { PokemonType } from '@shared/entities/view-models';

export interface ValidPokemonDetailProps {
  fullDetailedPokemon: Partial<GetDetailedPokemonDTO>;
}

const ValidPokemonDetail = ({ fullDetailedPokemon }: ValidPokemonDetailProps) => (
  <>
    <Grid item xs={12} lg={4} className="pokemon-detail_moves py-5">
      <h4 className="iron-color mb-6">Movimento(s)</h4>
      {fullDetailedPokemon.moves?.map(({ move }, index) => (
        <p key={index} className="gray-color">
          - {move.name}
        </p>
      ))}
    </Grid>
    <Grid item xs={12} lg={4} className="pokemon-detail_types py-5">
      <h4 className="iron-color mb-6">Natureza(s)</h4>
      {fullDetailedPokemon.types?.map((typeObj, index) => (
        <p key={index} className="gray-color">
          - {typeObj.type.name}
        </p>
      ))}
    </Grid>
    <Grid item xs={12} lg={4} className="pokemon-detail_abilities py-5">
      <h4 className="iron-color mb-6">Habilidade(s)</h4>
      {fullDetailedPokemon.abilities?.map(({ ability }, index) => (
        <p key={index} className="gray-color">
          - {ability.name}
        </p>
      ))}
    </Grid>
  </>
);

const NotValidPokemonDetail = () => (
  <h2 className="pokemon-detail__not-found lead-color">O pokémon buscado não pertence ao tipo oferecido na loja.</h2>
);

const LoadingFullDetailedPokemon = () => (
  <div className="pokemon-detai__loading-container flex justify-center py-10">
    <CircularProgress />
  </div>
);

const FullDetailedPokemonNotFound = () => (
  <h2 className="pokemon-detail__not-found lead-color">Que pena, o pokémon não foi encontrado.</h2>
);

export interface PokemonDetailParams {
  id: string;
  type: PokemonType;
}

export const PokemonDetail = () => {
  const history = useHistory();
  const { id, type } = useParams<PokemonDetailParams>();
  const { convertDetailedPokemonToPokemonViewModel } = useDetailedPokemonsService();
  const { fullDetailedPokemon$, isLoading$ } = useFullDetailedPokemonQuery();
  const { getFullPokemonDetailedInfo } = useFullDetailedPokemonService();
  const [isLoading, setIsLoading] = useState(false);
  const [fullDetailedPokemon, setFullDetailedPokemon] = useState<GetDetailedPokemonDTO>();

  useEffect(() => {
    const subscription1 = subscribeFullDetailedPokemonChanges();
    const subscription2 = subscribeIsLoadingFullDetailedPokemonChanges();

    return function cleanup(): void {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (id) {
      getFullPokemonDetailedInfo(id);
    }
  }, [id]);

  function subscribeFullDetailedPokemonChanges(): Subscription {
    return fullDetailedPokemon$.subscribe((value) => {
      const _value = value as GetDetailedPokemonDTO;
      setFullDetailedPokemon(_value);
    });
  }

  function subscribeIsLoadingFullDetailedPokemonChanges(): Subscription {
    return isLoading$.subscribe((value) => {
      setIsLoading(value);
    });
  }

  function handleBackPageClick() {
    history.push('/home');
  }

  function isPokemonOnRightStoreType(pokemon: GetDetailedPokemonDTO) {
    return pokemon.types?.find((typeObj) => typeObj.type.name === type);
  }

  return (
    <section className="pokemon-detail container mx-auto px-5 py-10">
      <Grid container spacing={3} className="pokemon-detail__grid flex justify-center">
        <Grid item xs={12} className="pokemon-detail__navigate flex items-center flex-wrap">
          <IconButton
            className="pokemon-detail__navigate--back"
            iconName="arrow_back_ios"
            tooltipDescription="Voltar"
            onClick={() => handleBackPageClick()}
          />
          {!!id && !!type && !isLoading && fullDetailedPokemon && (
            <>
              <img
                src={fullDetailedPokemon.sprites?.front_default}
                alt={fullDetailedPokemon.name}
                width="96px"
                height="96px"
              />
              <h2 className="pokemon-detail__navigate--title mx-4 lead-color">{fullDetailedPokemon.name}</h2>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {isLoading ? (
          <LoadingFullDetailedPokemon />
        ) : id && type && fullDetailedPokemon ? (
          isPokemonOnRightStoreType(fullDetailedPokemon) ? (
            <ValidPokemonDetail fullDetailedPokemon={fullDetailedPokemon} />
          ) : (
            <NotValidPokemonDetail />
          )
        ) : (
          <FullDetailedPokemonNotFound />
        )}
      </Grid>
    </section>
  );
};

export default PokemonDetail;
