import './header.scss';

import PokeStoreLogo from '@aquamons-store/assets/logo.png';
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
            <img src={PokeStoreLogo} className="mr-3" width="175px" height="50px" alt="logo" />
            <img src={WaterLogo} className="mr-3" width="50px" height="50px" alt="logo" />
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
