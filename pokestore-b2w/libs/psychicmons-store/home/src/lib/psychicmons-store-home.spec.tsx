import { render } from '@testing-library/react';

import PsychicmonsStoreHome from './psychicmons-store-home';

describe('PsychicmonsStoreHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PsychicmonsStoreHome />);
    expect(baseElement).toBeTruthy();
  });
});
