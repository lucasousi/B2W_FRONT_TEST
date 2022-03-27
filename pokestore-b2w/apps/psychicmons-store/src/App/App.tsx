import './App.scss';
import '../styles/custom-global-styles.scss';

import { ToastContainer } from 'react-toastify';

import { PsychicLogo } from '@psychicmons-store/assets';
import { CartDrawer, Header } from '@shared/components';

import { Routes } from '../routes/routes';

export const App = () => {
  return (
    <>
      <ToastContainer
        pauseOnFocusLoss
        className="toast-container"
        position="bottom-right"
        draggable={false}
        rtl={false}
        autoClose={4000}
      />
      <div className="app-root grid-cols-1">
        <Header elementLogo={PsychicLogo} />
        <main className="app-main pb-4">
          <CartDrawer />
          <Routes />
        </main>
      </div>
    </>
  );
};
