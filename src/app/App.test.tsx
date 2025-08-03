import { render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

import App from './App';

jest.mock('pages/Home/HomePage.tsx', () => {
  return {
    HomePage: () => {
      const [searchParams] = useSearchParams();
      const details = searchParams.get('details');
      return (
        <div>
          Home page
          {details && <div>Details Page</div>}
        </div>
      );
    },
  };
});
jest.mock('pages/About/AboutPage', () => ({
  AboutPage: () => <div>About page</div>,
}));
jest.mock('pages/NotFound/NotFoundPage.tsx', () => ({
  NotFoundPage: () => <div>Not Found</div>,
}));

describe('App routing', () => {
  it('renders HomePage for root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('renders AboutPage for about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('About page')).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/notexist/23/23Lljkljd']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders Details when details query param is present', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1&details=42']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Home page')).toBeInTheDocument();
    expect(screen.getByText('Details Page')).toBeInTheDocument();
  });
});
