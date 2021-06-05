import './app.scss';
import '../styles/custom-global-styles.scss';

import { CartDrawer, Header } from '@shared/components';

import { Routes } from '../routes/routes';

export const App = () => {
  return (
    <div className="app-root grid-cols-1">
      <Header pageTitle="Aquamons Store" />
      <main className="app-main">
        <CartDrawer />
        <Routes />
      </main>
    </div>
  );
};
