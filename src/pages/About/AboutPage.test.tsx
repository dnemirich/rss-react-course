import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
  });

  it('renders the Header component', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders main layout container', () => {
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders animal image with correct alt text', () => {
    const image = screen.getByAltText('Picture of animals in a museum');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Picture of animals in a museum');
  });

  it('renders bio paragraph', () => {
    expect(
      screen.getByText(/Hi! I am Dasha Nemirich. I am a former biologist/i)
    ).toBeInTheDocument();
  });

  it('renders Art Institute of Chicago API link', () => {
    const link = screen.getByRole('link', {
      name: /The Art Institute of Chicago API/i,
    });
    expect(link).toHaveAttribute('href', 'https://api.artic.edu/docs/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders Rolling Scopes logo and link', () => {
    const rsLink = screen.getByRole('link', {
      name: /Rolling scopes school logo/i,
    });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    const logo = screen.getByAltText('Rolling scopes school logo');
    expect(logo).toBeInTheDocument();
  });
});
