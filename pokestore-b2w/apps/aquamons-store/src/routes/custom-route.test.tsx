import { mount } from 'enzyme';
import { HashRouter, Route } from 'react-router-dom';

import { CustomRoute } from './custom-route';

describe('CustomRoute', () => {
  const wrapper = mount(<CustomRoute />, { wrappingComponent: HashRouter });

  it('shound have a Route component', () => {
    const routeComponentExists = wrapper.find(Route).exists();
    expect(routeComponentExists).toBe(true);
  });
});
