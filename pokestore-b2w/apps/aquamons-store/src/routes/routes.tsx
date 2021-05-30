import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AquamonsStoreHome } from '@aquamons-store/home';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AquamonsStoreHome />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
