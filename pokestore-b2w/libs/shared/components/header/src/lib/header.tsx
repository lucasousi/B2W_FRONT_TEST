import './header.scss';

import WaterLogo from '@aquamons-store/assets/water-icon.svg';
import { Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';

export interface HeaderProps {
  pageTitle: string;
}

export const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className="header-container flex items-center">
      <div className="container mx-auto px-5">
        <Grid container spacing={1} className="flex items-center">
          <Grid item xs={5} className="flex">
            <img src={WaterLogo} className="mr-3" width="50px" height="50px" alt="logo" />
            <h2>{pageTitle}</h2>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2} className="flex justify-end">
            <IconButton
              iconName="shopping_cart"
              className="cart-icon"
              tooltipDescription="Carrinho"
              onClick={() => alert('Falta implementar')}
            />
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
