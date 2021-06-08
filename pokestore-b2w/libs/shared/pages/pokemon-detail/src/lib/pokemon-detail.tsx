import './pokemon-detail.scss';

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Subscription } from 'rxjs';

import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { useFullDetailedPokemonQuery, useFullDetailedPokemonService } from '@shared/data';
import { GetDetailedPokemonDTO } from '@shared/entities/dtos';
import { PokemonType } from '@shared/entities/view-models';

export interface PokemonDetailParams {
  id: string;
  type: PokemonType;
}

export const PokemonDetail = () => {
  const history = useHistory();
  const { id, type } = useParams<PokemonDetailParams>();
  const { fullDetailedPokemon$, isLoading$ } = useFullDetailedPokemonQuery();
  const { getFullPokemonDetailedInfo } = useFullDetailedPokemonService();
  const [isLoading, setIsLoading] = useState(false);
  const [fullDetailedPokemon, setFullDetailedPokemon] = useState<Partial<GetDetailedPokemonDTO>>({});

  useEffect(() => {
    console.log(type);
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
      setFullDetailedPokemon(value);
    });
  }

  function subscribeIsLoadingFullDetailedPokemonChanges(): Subscription {
    return isLoading$.subscribe((value) => {
      setIsLoading(value);
    });
  }

  function handleBackPageClick() {
    history.goBack();
  }

  function isPokemonOnRightStoreType(pokemon: Partial<GetDetailedPokemonDTO>) {
    return pokemon.types?.find((typeObj) => typeObj.type.name === type);
  }

  return (
    <section className="pokemon-detail container mx-auto px-5 py-10">
      <Grid container spacing={3} className="pokemon-detail__grid flex justify-center">
        <Grid item xs={12} className="pokemon-detail__navigate flex items-center">
          <IconButton
            className="pokemon-detail__navigate--back"
            iconName="arrow_back_ios"
            tooltipDescription="Voltar"
            onClick={() => handleBackPageClick()}
          />
          {!!id && !!type && !isLoading && (
            <h2 className="pokemon-detail__navigate--title mx-4 lead-color">{fullDetailedPokemon.name}</h2>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {isLoading ? (
          <div className="pokemon-detai__loading-container flex justify-center py-10">
            <CircularProgress />
          </div>
        ) : id && type ? (
          isPokemonOnRightStoreType(fullDetailedPokemon) ? (
            <Grid item xs={2}>
              <img
                src={fullDetailedPokemon.sprites?.front_default}
                alt={fullDetailedPokemon.name}
                width="96px"
                height="96px"
              />
            </Grid>
          ) : (
            <h2 className="pokemon-detail__not-found lead-color">
              O pokémon buscado não pertence ao tipo oferecido na loja.
            </h2>
          )
        ) : (
          <h2 className="pokemon-detail__not-found lead-color">Que pena, o pokémon não foi encontrado.</h2>
        )}
      </Grid>
    </section>
  );
};

export default PokemonDetail;
