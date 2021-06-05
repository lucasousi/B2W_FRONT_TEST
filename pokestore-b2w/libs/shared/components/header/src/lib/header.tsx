import './header.scss';

import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import PokeStoreLogo from '@aquamons-store/assets/logo.png';
import WaterLogo from '@aquamons-store/assets/water-icon.svg';
import { Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { useCartQuery, useCartService } from '@shared/data';

export interface HeaderProps {
  pageTitle: string;
}

export const Header = ({ pageTitle }: HeaderProps) => {
  const { setOpenCart } = useCartService();
  const { items$ } = useCartQuery();
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const subscription1 = subscribeItemsChange();

    return function cleanup() {
      subscription1.unsubscribe();
    };
  }, []);

  function handleOpenCart() {
    setOpenCart(true);
  }

  function subscribeItemsChange(): Subscription {
    return items$.subscribe((items) => setItemsCount(items.length));
  }

  return (
    <header className="header-container flex items-center">
      <div className="container mx-auto px-5">
        <Grid container spacing={1} className="flex items-center">
          <Grid item xs={5} className="flex">
            <img src={PokeStoreLogo} className="mr-3" width="175px" height="50px" alt="logo" />
            <img src={WaterLogo} className="mr-3" width="50px" height="50px" alt="logo" />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2} className="flex justify-end">
            <IconButton
              iconName="shopping_cart"
              className="cart-icon"
              tooltipDescription="Carrinho"
              badgeCount={itemsCount}
              badgeColor="secondary"
              onClick={() => handleOpenCart()}
            />
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
