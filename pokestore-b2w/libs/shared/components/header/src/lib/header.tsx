import './header.scss';

import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';

import { PokeStoreLogo, WaterLogo } from '@aquamons-store/assets';
import { Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';
import { useCartQuery, useCartService } from '@shared/data';

export const Header = () => {
  const { setOpenCart } = useCartService();
  const { items$ } = useCartQuery();
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const subscription1 = subscribeItemsChange();

    return function cleanup(): void {
      subscription1.unsubscribe();
    };
  }, []);

  function handleOpenCart(): void {
    setOpenCart(true);
  }

  function subscribeItemsChange(): Subscription {
    return items$.subscribe((items) => setItemsCount(items.length));
  }

  return (
    <header className="header flex items-center">
      <div className="container mx-auto px-5">
        <Grid container spacing={1} className="flex items-center">
          <Grid item xs={5} className="flex items-center">
            <img src={PokeStoreLogo} className="header__pokestore-logo mr-3" alt="logo" />
            <img src={WaterLogo} className="header__pokemon-type-logo mr-3" alt="logo" />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2} className="flex justify-end">
            <IconButton
              iconName="shopping_cart"
              className="header__cart-icon"
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
