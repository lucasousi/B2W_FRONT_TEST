import './pokemon-card.scss';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
    Button, Card, CardActions, CardContent, CardHeader, Collapse, createStyles, makeStyles, Theme
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton } from '@shared/components/icon-button';
import { DetailedPokemon, SummaryPokemon } from '@shared/entities/dtos';
import { PokemonViewModel } from '@shared/entities/view-models';
import {
    applyMaskMoneyBR, convertDecimeterToCentimeter, convertHectogramToKilogram, toTitleCase
} from '@shared/helpers';
import { API } from '@shared/service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '100%',
      padding: '10px 20px',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

export interface PokemonCardProps {
  summaryPokemon: SummaryPokemon;
}

export function PokemonCard({ summaryPokemon }: PokemonCardProps) {
  const { pokemon } = summaryPokemon;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [detailedPokemon, setDetailedPokemon] = useState<PokemonViewModel>();
  const [expanded, setExpanded] = useState(false);
  const maxInstallments = 10;

  useEffect(() => {
    getPokemonDetailedInfo();
  }, []);

  function getFormattedInstallmentRealValue(value: number) {
    const installmentValue = value / maxInstallments;

    return applyMaskMoneyBR(installmentValue, true);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  async function getPokemonDetailedInfo() {
    try {
      setIsLoading(true);
      const { data } = await API.get<DetailedPokemon>(pokemon.url);
      const __pokemonViewModel: PokemonViewModel = {
        ...data,
        price: summaryPokemon.price,
      };
      setDetailedPokemon(__pokemonViewModel);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <Skeleton variant="rect" height={212} />
  ) : detailedPokemon ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <img
            src={detailedPokemon.sprites.front_default}
            alt={detailedPokemon.name}
            width="96px"
          />
        }
        title={
          <h4 className="lead-color">{toTitleCase(detailedPokemon.name)}</h4>
        }
        subheader={
          <div className="flex flex-col">
            <span className="lead-color pokemon-price">
              R$ {applyMaskMoneyBR(detailedPokemon.price, true)}
            </span>
            <span className="iron-color">
              10x de R${' '}
              {getFormattedInstallmentRealValue(detailedPokemon.price)} s/
              juros.
            </span>
          </div>
        }
      />

      <CardActions disableSpacing>
        <Button
          variant="outlined"
          color="primary"
          startIcon={
            <span className="material-icons-outlined">add_shopping_cart</span>
          }
        >
          Adicionar ao Carrinho
        </Button>
        <IconButton
          iconName="expand_more"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          tooltipDescription="Ver detalhes"
        ></IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="flex flex-col">
          <p className="iron-color">{`Peso: ${convertHectogramToKilogram(
            detailedPokemon.weight
          )} KG | Altura: ${convertDecimeterToCentimeter(
            detailedPokemon.height
          )} CM`}</p>
          <h5 className="lead-color mb-3">Habilidades</h5>
          {detailedPokemon.abilities &&
            detailedPokemon.abilities.map((abilityInfo, index) => (
              <small key={index}>{abilityInfo?.ability?.name}</small>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  ) : (
    <span>Nenhum pokémon encontrado.</span>
  );
}

export default PokemonCard;
