import './app.scss';
import '../styles/custom-global-styles.scss';

import { Header } from '@shared/components/header';

import { Routes } from '../routes/routes';

export function App() {
  return (
    <>
      <Header pageTitle="Aquamons Store" />
      <main className="app">
        <Routes />
      </main>
    </>
  );
}
