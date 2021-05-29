import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <></>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
