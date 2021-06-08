import { Observable } from 'rxjs';

import { createEntityQuery, QueryEntity } from '@datorama/akita';

import { PokemonViewModel } from '../../entities/view-models';
import { CartState, cartStore } from './cart.store';

export interface CartQuery {
  cartQuery: QueryEntity<CartState, unknown, unknown>;
  isLoading$: Observable<boolean>;
  open$: Observable<boolean>;
  items$: Observable<PokemonViewModel[]>;
}

export function useCartQuery(): CartQuery {
  const cartQuery = createEntityQuery<CartState>(cartStore);
  const isLoading$: Observable<boolean> = cartQuery.selectLoading();
  const open$ = cartQuery.select('open');
  const items$ = cartQuery.select('items');

  return { cartQuery, isLoading$, open$, items$ };
}
