import { render } from '@testing-library/react';

import BootstrapTooltip from './bootstrap-tooltip';

describe('BootstrapTooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BootstrapTooltip />);
    expect(baseElement).toBeTruthy();
  });
});
