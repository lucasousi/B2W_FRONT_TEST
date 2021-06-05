import './cart-drawer.scss';

import { useState } from 'react';

import { Button, Divider, Drawer } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';

export const CartDrawer = () => {
  const [open, setOpen] = useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
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
      <div className="cart-drawer__footer p-2">
        <Button variant="contained" color="primary">
          Finalizar
        </Button>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
