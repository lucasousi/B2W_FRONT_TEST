import { lazy, Suspense } from 'react';
import { HashRouter, Redirect, RouteProps, Switch } from 'react-router-dom';

import { CustomRoute } from './custom-route';

const _AquamonsStoreHome = lazy(() =>
  import('@aquamons-store/home').then(({ AquamonsStoreHome }) => ({
    default: AquamonsStoreHome,
  }))
);

const _PokemonDetail = lazy(() =>
  import('@shared/pages').then(({ PokemonDetail }) => ({
    default: PokemonDetail,
  }))
);

const navigableRoutes: RouteProps[] = [
  { path: '/', exact: true, component: () => <Redirect to="/home" /> },
  { path: '/home', exact: true, component: _AquamonsStoreHome },
  { path: '/pokemon-detail/:type/:id', component: _PokemonDetail },
  { component: () => <Redirect to="/home" /> },
];

export const Routes = () => {
  return (
    <HashRouter>
      <Suspense fallback={<></>}>
        <Switch>
          {!!navigableRoutes?.length &&
            navigableRoutes.map((route, index) => <CustomRoute key={index} {...route}></CustomRoute>)}
        </Switch>
      </Suspense>
    </HashRouter>
  );
};
