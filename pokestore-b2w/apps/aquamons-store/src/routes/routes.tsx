import { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, RouteProps, Switch } from 'react-router-dom';

import { CustomRoute } from './custom-route';

const AquamonsStoreHome = lazy(() =>
  import('@aquamons-store/home').then(({ AquamonsStoreHome }) => ({
    default: AquamonsStoreHome,
  }))
);

const navigableRoutes: RouteProps[] = [
  { path: '/', exact: true, component: () => <Redirect to="/home" /> },
  { path: '/home', exact: true, component: AquamonsStoreHome },
  { component: () => <Redirect to="/home" /> },
];

export const Routes = () => {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Switch>
          {!!navigableRoutes?.length &&
            navigableRoutes.map((route, index) => <CustomRoute key={index} {...route}></CustomRoute>)}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
