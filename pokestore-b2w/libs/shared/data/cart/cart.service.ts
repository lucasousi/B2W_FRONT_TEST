import { PokemonViewModel } from '../../entities/view-models';
import {
    addItemToCartStore, cartStore, removeItemFromCartStore, setOpenToCartStore
} from './cart.store';

export interface CartService {
  setOpen: (value: boolean) => void;
  addItemToCart: (item: PokemonViewModel) => void;
  removeItemFromCart: (item: PokemonViewModel) => void;
  clearCart: () => void;
}

export function useCartService(): CartService {
  function setOpen(value: boolean) {
    setOpenToCartStore(value);
  }

  function addItemToCart(item: PokemonViewModel) {
    addItemToCartStore(item);
  }

  function removeItemFromCart(item: PokemonViewModel) {
    removeItemFromCartStore(item);
  }

  function clearCart() {
    cartStore.reset();
  }

  return { setOpen, addItemToCart, removeItemFromCart, clearCart };
}
