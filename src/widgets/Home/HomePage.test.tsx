import { act, fireEvent, render, screen } from '@testing-library/react';
import { useFetchAllArtworksQuery } from 'entities/artwork';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LS_KEY } from 'shared/constants/search-constants.ts';
import { store } from 'shared/lib/store/store.ts';

import { HomePage } from './HomePage.tsx';

jest.mock('entities/artwork', () => ({
  ...jest.requireActual('entities/artwork'),
  useFetchAllArtworksQuery: jest.fn(),
}));

function mockHookState(
  state: Partial<ReturnType<typeof useFetchAllArtworksQuery>>
) {
  const defaults = {
    data: undefined,
    error: undefined,
    isError: false,
    isFetching: false,
    isLoading: false,
    refetch: jest.fn(),
  };
  return { ...defaults, ...state } as unknown as ReturnType<
    typeof useFetchAllArtworksQuery
  >;
}

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
  (useFetchAllArtworksQuery as jest.Mock).mockReturnValue(
    mockHookState({ data: [], isFetching: false, isLoading: false })
  );
});

describe('App (localStorage integration)', () => {
  it('search value should be added to ls on search', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
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
      render(
        <Provider store={store}>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(screen.getByRole('textbox')).toHaveValue('value from storage');
  });

  it('input should be empty when ls value is omit', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('trailing spaces should be trimmed ', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
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

  it('loader should render during loading', () => {
    (useFetchAllArtworksQuery as jest.Mock).mockReturnValue(
      mockHookState({ isFetching: true, isLoading: true })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('error should be displayed for response error', async () => {
    (useFetchAllArtworksQuery as jest.Mock).mockReturnValue(
      mockHookState({
        error: { data: { message: 'Network error' }, status: 500 },
        isError: true,
        isFetching: false,
        isLoading: false,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(/Request failed with status 500/i)
    ).toBeInTheDocument();
  });

  // it('correct error message should be rendered when error is a string-like', async () => {
  //   (useFetchAllArtworksQuery as jest.Mock).mockReturnValue(
  //     mockHookState({
  //       error: { error: 'Custom error as string', status: 'FETCH_ERROR' },
  //       isError: true,
  //       isFetching: false,
  //       isLoading: false,
  //     })
  //   );
  //
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <HomePage />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //
  //   expect(
  //     await screen.findByText(/Custom error as string/i)
  //   ).toBeInTheDocument();
  // });
});
