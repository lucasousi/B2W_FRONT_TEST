import { mount } from 'enzyme';

import { AquamonsStoreHome } from './aquamons-store-home';

describe('HomePage', () => {
  const wrapper = mount(<AquamonsStoreHome />);

  it('should have a unique title h2', () => {
    const titleElements = wrapper.find('h2');
    expect(titleElements.length).toEqual(1);
  });
});
