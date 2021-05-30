import { render } from '@testing-library/react';

import AquamonsStoreHome from './aquamons-store-home';

describe('AquamonsStoreHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AquamonsStoreHome />);
    expect(baseElement).toBeTruthy();
  });
});
