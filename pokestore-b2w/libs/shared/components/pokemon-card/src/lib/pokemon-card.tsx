import './pokemon-card.scss';

import clsx from 'clsx';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Subscription } from 'rxjs';

import {
    Button, Card, CardActions, CardContent, CardHeader, Collapse, createStyles, makeStyles, Theme
} from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { useCartQuery, useCartService } from '@shared/data';
import { PokemonViewModel } from '@shared/entities/view-models';
import {
    applyMaskMoneyBR, convertDecimeterToCentimeter, convertHectogramToKilogram, toTitleCase
} from '@shared/helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '100%',
      padding: '10px 20px',
    },
    expand: {
      transform: 'rotate(0deg)',
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
  formattedPokemon: PokemonViewModel;
}

export const PokemonCard = ({ formattedPokemon }: PokemonCardProps) => {
  const maxInstallments = 10;
  const classes = useStyles();
  const { addItemToCart, removeItemFromCart } = useCartService();
  const { items$ } = useCartQuery();
  const [expanded, setExpanded] = useState(false);
  const [itemsOnCart, setItemsOnCart] = useState<PokemonViewModel[]>([]);

  useEffect(() => {
    const subscription1 = subscribeItemsChange();

    return function cleanup() {
      subscription1.unsubscribe();
    };
  }, []);

  function subscribeItemsChange(): Subscription {
    return items$.subscribe((items) => setItemsOnCart(items));
  }

  function isPokemonOnCart(pokemon: PokemonViewModel) {
    return itemsOnCart?.find((item) => isEqual(item, pokemon));
  }

  function getFormattedInstallmentRealValue(value: number) {
    const installmentValue = value / maxInstallments;

    return applyMaskMoneyBR(installmentValue);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleBuyPokemon(pokemon: PokemonViewModel) {
    addItemToCart(pokemon);
    toast(`${pokemon.name} inserido no carrinho!`);
  }

  function handleUnbuyPokemon(pokemon: PokemonViewModel) {
    removeItemFromCart(pokemon);
    toast.dark(`${pokemon.name} removido do carrinho.`);
  }

  return formattedPokemon ? (
    <Card className={`pokemon-card shadow-sm ${classes.root}`} onMouseLeave={() => expanded && handleExpandClick()}>
      <CardHeader
        avatar={
          <img src={formattedPokemon.sprites.front_default} alt={formattedPokemon.name} width="96px" height="96px" />
        }
        title={<h4 className="lead-color mb-2">{formattedPokemon.name}</h4>}
        subheader={
          <div className="flex flex-col">
            <span className="lead-color pokemon-price">{applyMaskMoneyBR(formattedPokemon.price)}</span>
            <span className="iron-color">
              {maxInstallments}x de {getFormattedInstallmentRealValue(formattedPokemon.price)} s/ juros.
            </span>
          </div>
        }
      />

      <CardActions disableSpacing className="pokemon-card__actions">
        <div className="pokemon-card__actions__left">
          {isPokemonOnCart(formattedPokemon) ? (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<span className="material-icons-outlined">remove_shopping_cart</span>}
              onClick={() => handleUnbuyPokemon(formattedPokemon)}
            >
              Remover
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<span className="material-icons-outlined">add_shopping_cart</span>}
              onClick={() => handleBuyPokemon(formattedPokemon)}
            >
              Comprar
            </Button>
          )}
        </div>
        <div className="pokemon-card__actions__right">
          <IconButton iconName="auto_stories" iconType="two-tone" tooltipDescription="Ver dossiê pokémon" />
          <IconButton
            iconName="arrow_drop_down"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            tooltipDescription="Ver detalhes básicos"
          ></IconButton>
        </div>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="flex flex-col">
          <p className="iron-color">{`Peso: ${convertHectogramToKilogram(formattedPokemon.weight)} KG`}</p>
          <p className="iron-color">{`Altura: ${convertDecimeterToCentimeter(formattedPokemon.height)} CM`}</p>
          <p className="iron-color mt-3">Habilidades:</p>
          {formattedPokemon.abilities &&
            formattedPokemon.abilities.map((abilityInfo, index) => (
              <p className="iron-color" key={index}>
                {`- ${abilityInfo?.ability?.name ? toTitleCase(abilityInfo.ability.name) : ''}`}
              </p>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  ) : (
    <span>Nenhum pokémon encontrado.</span>
  );
};

export default PokemonCard;
