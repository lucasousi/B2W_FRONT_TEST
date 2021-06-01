import './app.scss';
import '../styles/custom-global-styles.scss';

import { CartDrawer, Header } from '@shared/components';

import { Routes } from '../routes/routes';

export function App() {
  return (
    <>
      <Header pageTitle="Aquamons Store" />
      <main className="app">
        <CartDrawer />
        <Routes />
      </main>
    </>
  );
}
