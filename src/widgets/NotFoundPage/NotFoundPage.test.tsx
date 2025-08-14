import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFoundPage } from './NotFoundPage.tsx';

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });

  it('renders 404 heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404');
  });

  it("displays the 'Oops' message", () => {
    expect(
      screen.getByText("Oops, this page doesn't exist", { exact: false })
    ).toBeInTheDocument();
  });

  it('renders the link to go back to the main page', () => {
    const link = screen.getByRole('link', { name: /back to the main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/'); // предполагается, что ROUTES.HOME = '/'
  });

  it('renders an icon inside the link', () => {
    const svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
