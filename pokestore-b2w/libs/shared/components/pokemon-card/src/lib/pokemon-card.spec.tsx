import { render } from '@testing-library/react';

import PokemonCard from './pokemon-card';

describe('PokemonCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonCard />);
    expect(baseElement).toBeTruthy();
  });
});
