import 'nprogress/nprogress.css';
import './custom-route.scss';

import nprogress from 'nprogress';
import { Route, RouteProps } from 'react-router-dom';

import { useComponentDidMount, useComponentWillMount } from '@shared/hooks';

export const CustomRoute = (props: RouteProps) => {
  useComponentWillMount(() => {
    nprogress.start();
  });

  useComponentDidMount(() => {
    nprogress.done();
  });

  return <Route {...props} />;
};
