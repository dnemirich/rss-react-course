import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import * as api from './api/characters-api';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Fallback } from './components/Fallback/Fallback.tsx';
import { LS_KEY } from './constants/constants.ts';

jest.mock('./api/characters-api', () => ({
  fetchCharacters: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('App (localStorage integration)', () => {
  it('search value should be added to ls on search', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: '  test value  ' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });
    expect(localStorage.getItem(LS_KEY)).toBe('test value');
  });

  it('ls value should be renewed when the search is fired', async () => {
    localStorage.setItem(LS_KEY, 'old');
    render(<App />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'new query' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });
    expect(localStorage.getItem(LS_KEY)).toBe('new query');
  });

  it('input should have value from ls after mounting', async () => {
    localStorage.setItem(LS_KEY, 'value from storage');
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByRole('textbox')).toHaveValue('value from storage');
  });

  it('input should be empty when ls value is omit', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('trailing spaces should be trimmed ', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: '   spaced   ' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });
    expect(localStorage.getItem(LS_KEY)).toBe('spaced');
  });

  it('spaces within the text should remain intact', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });
    expect(localStorage.getItem(LS_KEY)).toBe('Luke Skywalker');
  });

  it('state should renew when value is changed', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'changed value' } });
    });
    expect(input).toHaveValue('changed value');
  });
});

describe('App UI/async scenarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('loader should render during loading', async () => {
    (api.fetchCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('error should be displayed for response error', async () => {
    (api.fetchCharacters as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText('Network error')).toBeInTheDocument()
    );
  });

  it('Fallback should be rendered when throw error button is clicked', async () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValueOnce([]);

    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <App />
      </ErrorBoundary>
    );

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Throw error/i })
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: /Throw error/i }));

    await waitFor(() =>
      expect(
        screen.getByText(
          /Ooops, something went wrong! Try to refresh the page./i
        )
      ).toBeInTheDocument()
    );
  });

  it('correct error message should be rendered when error has some other type', async () => {
    (api.fetchCharacters as jest.Mock).mockRejectedValueOnce(
      'Custom error as string'
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Custom error as string')).toBeInTheDocument();
    });
  });
});
