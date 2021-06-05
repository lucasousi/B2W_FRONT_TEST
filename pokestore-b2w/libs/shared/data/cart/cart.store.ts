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
  cartStore.update(
    (currentState) =>
      ({
        open: currentState.open,
        items: arrayAdd(currentState.items, newItem),
      } as CartState)
  );
}

export function removeItemFromCartStore(item: PokemonViewModel) {
  cartStore.update(
    (currentState) =>
      ({
        open: currentState.open,
        items: arrayRemove<PokemonViewModel[], PokemonViewModel>(currentState.items, (currentStateArrayItem) =>
          isEqual(currentStateArrayItem, item)
        ),
      } as CartState)
  );
}
