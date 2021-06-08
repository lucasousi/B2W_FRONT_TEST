import { mount } from 'enzyme';

import { FiremonsStoreHome } from './firemons-store-home';

describe('HomePage', () => {
  const wrapper = mount(<FiremonsStoreHome />);

  it('should have a unique title h2', () => {
    const titleElements = wrapper.find('h2');
    expect(titleElements.length).toEqual(1);
  });
});
