import './cart-drawer.scss';

import { sum } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Subscription } from 'rxjs';

import SadPikachu from '@aquamons-store/assets/sad-pikachu.gif';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer,
    Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IconButton, MaterialIcon } from '@shared/components';
import { useCartQuery, useCartService } from '@shared/data';
import { PokemonViewModel } from '@shared/entities/view-models';
import { applyMaskMoneyBR, getLimitedRandonNumber } from '@shared/helpers';

export const CartDrawer = () => {
  const maxInstallments = 10;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open$, items$ } = useCartQuery();
  const { setOpenCart, removeItemFromCart } = useCartService();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<PokemonViewModel[]>([]);
  const [totalSum, setTotalSum] = useState(0);
  const [cashback, setCashback] = useState(0);
  const [openCashbackDialog, setOpenCashbackDialog] = useState(false);

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
    return items$.subscribe((items) => {
      setItems(items);
      calcTotalSum(items);
    });
  }

  function handleDrawerClose(): void {
    setOpenCart(false);
  }

  function calcTotalSum(pokemons: PokemonViewModel[]): void {
    const prices = pokemons.map((item) => item.price);
    const _totalSum = sum(prices);
    setTotalSum(_totalSum);
    calcCashback(_totalSum);
  }

  function calcCashback(total: number) {
    setCashback(getLimitedRandonNumber(1, total / 3));
  }

  function handleUnbuyPokemon(pokemon: PokemonViewModel) {
    removeItemFromCart(pokemon);
    toast.dark(`${pokemon.name} removido do carrinho.`);
  }

  function handleFinishShop(): void {
    handleOpenCashbackDialog();
  }

  function handleOpenCashbackDialog(): void {
    setOpenCashbackDialog(true);
  }

  function handleCloseCashbackDialog(): void {
    setOpenCashbackDialog(false);
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
                <strong className="iron-color">{applyMaskMoneyBR(item.price, false)}</strong>
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
              <h3 className="lead-color text-right">{applyMaskMoneyBR(totalSum)}</h3>
              <span className="iron-color text-right">
                {maxInstallments}x de {applyMaskMoneyBR(totalSum / maxInstallments)} s/ juros.
              </span>
            </Grid>
            <Grid item xs={12} className="cart-drawer__footer flex justify-center py-5">
              <Button
                className="w-1/2"
                variant="contained"
                color="primary"
                disabled={!items?.length}
                onClick={handleFinishShop}
              >
                Finalizar Compra
              </Button>
            </Grid>

            <Dialog
              fullScreen={fullScreen}
              open={openCashbackDialog}
              onClose={handleCloseCashbackDialog}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">Obrigado pela compra.</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Esperamos que você retorne em breve para levar mais pokémons de nossa loja! Como forma de
                  agradecimento, você recebeu um <strong>cashback</strong> de:
                  <h4 className="mt-4">{applyMaskMoneyBR(cashback)}</h4>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCashbackDialog} color="primary" variant="contained" autoFocus>
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Grid>
    </Drawer>
  );
};

export default CartDrawer;
