import { render } from '@testing-library/react';

import MaterialIcon from './material-icon';

describe('SharedComponentsMaterialIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MaterialIcon iconName="mockIcon" />);
    expect(baseElement).toBeTruthy();
  });
});
