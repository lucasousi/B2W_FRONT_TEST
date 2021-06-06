import './cart-drawer.scss';

import { sum } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Subscription } from 'rxjs';

import SadPikachu from '@aquamons-store/assets/sad-pikachu.gif';
import { Button, Divider, Drawer, Grid } from '@material-ui/core';
import { IconButton, MaterialIcon } from '@shared/components';
import { useCartQuery, useCartService } from '@shared/data';
import { PokemonViewModel } from '@shared/entities/view-models';
import { applyMaskMoneyBR } from '@shared/helpers';

export const CartDrawer = () => {
  const maxInstallments = 10;
  const { open$, items$ } = useCartQuery();
  const { setOpenCart, removeItemFromCart } = useCartService();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<PokemonViewModel[]>([]);

  useEffect(() => {
    const subscription1 = subscribeOpenStatusChange();
    const subscription2 = subscribeItemsChange();

    return function cleanup() {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    };
  }, []);

  function subscribeOpenStatusChange(): Subscription {
    return open$.subscribe((value) => setOpen(value));
  }

  function subscribeItemsChange(): Subscription {
    return items$.subscribe((items) => setItems(items));
  }

  function handleDrawerClose() {
    setOpenCart(false);
  }

  function getTotalSum(pokemons: PokemonViewModel[]) {
    const prices = pokemons.map((item) => item.price);
    return sum(prices);
  }

  function handleUnbuyPokemon(pokemon: PokemonViewModel) {
    removeItemFromCart(pokemon);
    toast.dark(`${pokemon.name} removido do carrinho.`);
  }

  return (
    <Drawer anchor="right" open={open} className="cart-drawer">
      <Grid container spacing={0} className="cart-drawer__grid flex justify-center">
        <Grid item xs={12} className="cart-drawer__header flex justify-end p-2">
          <IconButton iconName="close" tooltipDescription="Fechar Carrinho" onClick={handleDrawerClose} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} className="cart-drawer__title text-center px-2 py-5">
          <div className="flex items-center justify-center">
            <MaterialIcon className="mr-2" iconName="shopping_cart" />
            <h3 className="lead-color">Carrinho de Compras</h3>
          </div>
          <span className="gray-color">Abaixo, todos os pokémons que você levará para sua Pokédex.</span>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {items.length ? (
          items.map((item, index) => (
            <Fragment key={index}>
              <Grid item xs={8} className="cart-drawer__body__item--left flex justify-start items-center px-3">
                <img src={item.sprites.front_default} alt={item.name} width="96px" height="96px" />
                <strong className="iron-color">{item.name}</strong>
              </Grid>
              <Grid item xs={4} className="cart-drawer__body__item--right flex justify-end items-center px-5">
                <strong className="iron-color">R$ {applyMaskMoneyBR(item.price, true)}</strong>
                <IconButton
                  className="ml-2"
                  iconName="remove_circle_outline"
                  color="secondary"
                  tooltipDescription="Remover do carrinho"
                  onClick={() => handleUnbuyPokemon(item)}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Fragment>
          ))
        ) : (
          <div className="cart-drawer__not-found py-4">
            <img src={SadPikachu} width="100%" height="100%" alt="pokemon-not-found" />
            <h4 className="lead-color pt-4">Nenhum pokémon encontrado :(</h4>
          </div>
        )}
        {!!items?.length && (
          <>
            <Grid item xs={6} className="py-10 px-5">
              <h3 className="lead-color">Total: </h3>
            </Grid>
            <Grid item xs={6} className="flex justify-end flex-col py-10 px-5">
              <h3 className="lead-color text-right">{applyMaskMoneyBR(getTotalSum(items))}</h3>
              <span className="iron-color text-right">
                {maxInstallments}x de R$ {applyMaskMoneyBR(getTotalSum(items) / maxInstallments)} s/ juros.
              </span>
            </Grid>
            <Grid item xs={12} className="cart-drawer__footer flex justify-center py-5">
              <Button className="w-1/2" variant="contained" color="primary" disabled={!items?.length}>
                Finalizar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Drawer>
  );
};

export default CartDrawer;
