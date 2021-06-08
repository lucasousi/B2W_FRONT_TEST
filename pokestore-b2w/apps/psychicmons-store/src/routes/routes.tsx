import { lazy, Suspense } from 'react';
import { HashRouter, Redirect, RouteProps, Switch } from 'react-router-dom';

import { CustomRoute } from './custom-route';

const _PsychicmonsStoreHome = lazy(() =>
  import('@psychicmons-store/home').then(({ PsychicmonsStoreHome }) => ({
    default: PsychicmonsStoreHome,
  }))
);

const _PokemonDetail = lazy(() =>
  import('@shared/pages').then(({ PokemonDetail }) => ({
    default: PokemonDetail,
  }))
);

const navigableRoutes: RouteProps[] = [
  { path: '/', exact: true, component: () => <Redirect to="/home" /> },
  { path: '/home', exact: true, component: _PsychicmonsStoreHome },
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
