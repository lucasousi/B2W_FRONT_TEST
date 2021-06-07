import { configure, mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { CustomRoute } from './custom-route';

describe('AppComponent', () => {
  let wrapper = mount(<CustomRoute />, { wrappingComponent: HashRouter });

  it('1', () => {
    expect(1).toEqual(1);
  });
});
