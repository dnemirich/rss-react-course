import { render, screen } from '@testing-library/react';

import { Fallback } from './Fallback';

describe('Fallback component', () => {
  it('renders the error message', () => {
    render(<Fallback />);
    expect(
      screen.getByText(/Ooops, something went wrong! Try to refresh the page./i)
    ).toBeInTheDocument();
  });
});
