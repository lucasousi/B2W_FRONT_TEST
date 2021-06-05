import { isEqual } from 'lodash';

import { arrayAdd, arrayRemove, createEntityStore } from '@datorama/akita';

import { PokemonViewModel } from '../../entities/view-models';

export interface CartState {
  open: boolean;
  items: PokemonViewModel[];
}

function getInitialState(): CartState {
  return { open: false, items: [] };
}

export const cartStore = createEntityStore<CartState>(getInitialState(), {
  name: 'cart',
  idKey: 'entityID',
});

export function setOpenToCartStore(value: boolean) {
  cartStore.update((currentState) => ({
    ...currentState,
    open: value,
  }));
}

export function addItemToCartStore(newItem: PokemonViewModel) {
  cartStore.update(({ open: currentStateOpen, items: currentStateItems }) => ({
    open: currentStateOpen,
    itens: arrayAdd(currentStateItems, newItem),
  }));
}

export function removeItemFromCartStore(item: PokemonViewModel) {
  cartStore.update(({ open: currentStateOpen, items: currentStateItems }) => ({
    open: currentStateOpen,
    itens: arrayRemove<PokemonViewModel[], PokemonViewModel>(currentStateItems, (currentStateArrayItem) =>
      isEqual(currentStateArrayItem, item)
    ),
  }));
}
