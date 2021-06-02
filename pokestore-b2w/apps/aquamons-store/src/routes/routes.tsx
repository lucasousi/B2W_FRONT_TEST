import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { AquamonsStoreHome } from '@aquamons-store/home';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <AquamonsStoreHome />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
