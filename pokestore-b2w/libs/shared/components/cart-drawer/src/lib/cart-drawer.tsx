import './cart-drawer.scss';

import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { Button, Divider, Drawer } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { useCartQuery, useCartService } from '@shared/data';
import { PokemonViewModel } from '@shared/entities/view-models';

export const CartDrawer = () => {
  const { open$, items$ } = useCartQuery();
  const { setOpenCart } = useCartService();
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

  return (
    <Drawer anchor="right" open={open} className="cart-drawer">
      <div className="cart-drawer__header flex justify-end p-2">
        <IconButton iconName="close" tooltipDescription="Fechar Carrinho" onClick={handleDrawerClose} />
      </div>
      <Divider />
      <div className="cart-drawer__body p-2">
        <h3>Seu Carrinho</h3>
      </div>
      <Divider />
      {items.map((item, index) => (
        <div key={index} className="cart-drawer__item">
          {item.name} - {item.price}
        </div>
      ))}
      <div className="cart-drawer__footer p-2">
        <Button variant="contained" color="primary">
          Finalizar
        </Button>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
