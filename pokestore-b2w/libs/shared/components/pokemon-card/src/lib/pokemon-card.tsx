import './pokemon-card.scss';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
    Button, Card, CardActions, CardContent, CardHeader, Collapse, createStyles, Grid, makeStyles,
    Theme
} from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { DetailedPokemon, SummaryPokemon } from '@shared/entities/dtos';
import { PokemonViewModel } from '@shared/entities/view-models';
import {
    applyMaskMoneyBR, convertDecimeterToCentimeter, convertHectogramToKilogram,
    getLimitedRandonNumber, toTitleCase
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

export function PokemonCard({ summaryPokemon: { pokemon } }: PokemonCardProps) {
  const classes = useStyles();
  const [detailedPokemon, setDetailedPokemon] = useState<PokemonViewModel>();
  const [expanded, setExpanded] = useState(false);
  const maxInstallments = 10;

  useEffect(() => {
    getPokemonDetailedInfo();
  }, []);

  function getFormattedInstallmentRealValue(value: number) {
    return Math.ceil(
      Number((applyMaskMoneyBR(value, true) / maxInstallments).toFixed(2))
    ).toFixed(2);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  async function getPokemonDetailedInfo() {
    try {
      const { data } = await API.get<DetailedPokemon>(pokemon.url);
      const __pokemonViewModel: PokemonViewModel = {
        ...data,
        price: getLimitedRandonNumber(100, 1000),
      };
      setDetailedPokemon(__pokemonViewModel);
    } catch (ex) {
      console.error(ex);
    }
  }

  return detailedPokemon ? (
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
          <p className="iron-color">{`Peso: ${convertHectogramToKilogram(
            detailedPokemon.weight
          )} KG | Altura: ${convertDecimeterToCentimeter(
            detailedPokemon.height
          )} CM`}</p>
        }
      />

      <CardContent className="flex flex-col">
        <Grid container spacing={3}>
          <Grid item xs={4} className="flex justify-center items-center">
            <span className="material-icons-two-tone">local_mall</span>
          </Grid>
          <Grid item xs={8} className="flex flex-col">
            <span className="lead-color pokemon-price text-right">
              R$ {applyMaskMoneyBR(detailedPokemon.price, true)}
            </span>
            <span className="iron-color text-right">
              10x de R${' '}
              {getFormattedInstallmentRealValue(detailedPokemon.price)} c/
              juros.
            </span>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Button
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
          <h5 className="lead-color mb-3">Habilidades</h5>
          {detailedPokemon.abilities &&
            detailedPokemon.abilities.map((abilityInfo, index) => (
              <small key={index}>{abilityInfo?.ability?.name}</small>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  ) : (
    <></>
  );
}

export default PokemonCard;
