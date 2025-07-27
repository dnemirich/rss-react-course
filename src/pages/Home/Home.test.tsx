import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import * as api from '../../entities/artwork/model/artworks-api.ts';
import { LS_KEY } from '../../widgets/shared/constants/search-constants.ts';
import { HomePage } from './HomePage.tsx';

jest.mock('./api/artworks-api.ts', () => ({
  fetchAllArtworks: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('App (localStorage integration)', () => {
  it('search value should be added to ls on search', async () => {
    render(<HomePage />);
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
    render(<HomePage />);
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
      render(<HomePage />);
    });
    expect(screen.getByRole('textbox')).toHaveValue('value from storage');
  });

  it('input should be empty when ls value is omit', async () => {
    await act(async () => {
      render(<HomePage />);
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('trailing spaces should be trimmed ', async () => {
    render(<HomePage />);
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
    render(<HomePage />);
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Da Vinci' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /search/i }));
    });
    expect(localStorage.getItem(LS_KEY)).toBe('Da Vinci');
  });

  it('state should renew when value is changed', async () => {
    render(<HomePage />);
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
    (api.fetchAllArtworks as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    render(<HomePage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('error should be displayed for response error', async () => {
    (api.fetchAllArtworks as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );
    render(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText('Network error')).toBeInTheDocument()
    );
  });

  it('correct error message should be rendered when error has some other type', async () => {
    (api.fetchAllArtworks as jest.Mock).mockRejectedValueOnce(
      'Custom error as string'
    );
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('Custom error as string')).toBeInTheDocument();
    });
  });
});
