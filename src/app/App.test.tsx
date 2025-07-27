import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import App from './App';

jest.mock('pages/Home/HomePage.tsx', () => ({
  HomePage: () => (
    <div>
      Home page
      <Outlet />
    </div>
  ),
}));
jest.mock('pages/About/AboutPage', () => ({
  AboutPage: () => <div>About page</div>,
}));
jest.mock('pages/NotFound/NotFoundPage.tsx', () => ({
  NotFoundPage: () => <div>Not Found</div>,
}));
jest.mock('widgets/Details/Details.tsx', () => ({
  Details: () => <div>Details Page</div>,
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

  it('renders Details for details route', () => {
    render(
      <MemoryRouter initialEntries={['/1/42']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Details Page')).toBeInTheDocument();
  });
});
