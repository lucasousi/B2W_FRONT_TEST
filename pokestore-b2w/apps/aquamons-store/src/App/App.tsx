import './app.scss';
import '../styles/custom-global-styles.scss';

import { Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';

import { Routes } from '../routes/routes';

export function App() {
  const Header = () => (
    <header className="header-container flex items-center">
      <div className="container mx-auto">
        <Grid container spacing={1} className="flex items-center">
          <Grid item xs={4}>
            <h2>Aquamons Store</h2>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2} className="flex justify-end">
            <IconButton
              iconName="shopping_cart"
              iconType="two-tone"
              className="cart-icon"
              tooltipDescription="Carrrinho"
              onClick={() => alert('oi')}
            />
          </Grid>
        </Grid>
      </div>
    </header>
  );

  return (
    <>
      <Header />
      <main className="app">
        <Routes />
      </main>
    </>
  );
}
