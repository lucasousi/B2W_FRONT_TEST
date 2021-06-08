import { mount } from 'enzyme';
import { ToastContainer } from 'react-toastify';

import { CartDrawer, Header } from '@shared/components';

import { Routes } from '../routes/routes';
import { App } from './app';

describe('AppComponent', () => {
  const wrapper = mount(<App />);

  it('should have a unique root div element', () => {
    const rootElements = wrapper.find('.app-root');
    expect(rootElements.length).toEqual(1);
  });

  it('should render a ToastContainer component', () => {
    const toastContainerExists = wrapper.find(ToastContainer).exists();
    expect(toastContainerExists).toBe(true);
  });

  it('should have a unique ToastContainer component', () => {
    const toastElements = wrapper.find('.toast-container');
    expect(toastElements.length).toEqual(1);
  });

  it('should have a unique main div element', () => {
    const mainElements = wrapper.find('.app-main');
    expect(mainElements.length).toEqual(1);
  });

  it('should render a Header component', () => {
    const headerExists = wrapper.find(Header).exists();
    expect(headerExists).toBe(true);
  });

  it('should render a CartDrawer component', () => {
    const cartDrawerExists = wrapper.find(CartDrawer).exists();
    expect(cartDrawerExists).toBe(true);
  });

  it('should render a Routes component', () => {
    const routesExists = wrapper.find(Routes).exists();
    expect(routesExists).toBe(true);
  });
});
