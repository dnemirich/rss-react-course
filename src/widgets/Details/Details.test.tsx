import { render, screen } from '@testing-library/react';
import * as ArtworkApi from 'entities/artwork';
import { MemoryRouter } from 'react-router-dom';
import { mockArtworkData } from 'shared/utils/test-utils/mock-data.ts';

import { Details } from './Details';

jest.mock('entities/artwork', () => ({
  ...jest.requireActual('entities/artwork'),
  useFetchArtworkByIdQuery: jest.fn(),
}));

describe('Details component', () => {
  const mockArtwork = mockArtworkData[0];

  const renderWithRouter = (
    detailsId = mockArtwork.id.toString(),
    page = '1'
  ) => {
    const entry = `/?page=${page}&details=${detailsId}`;
    render(
      <MemoryRouter initialEntries={[entry]}>
        <Details />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders artwork details', async () => {
    (ArtworkApi.useFetchArtworkByIdQuery as jest.Mock).mockReturnValue({
      data: { data: mockArtwork },
      error: undefined,
      isError: false,
      isFetching: false,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithRouter();

    expect(await screen.findByText(mockArtwork.title)).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.artist_title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockArtwork.date_display}, ${mockArtwork.place_of_origin}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Dimensions:/)).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.dimensions || '-')).toBeInTheDocument();
    expect(screen.getByText(/Materials:/)).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.medium_display)).toBeInTheDocument();

    mockArtwork.category_titles.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders loading state', () => {
    (ArtworkApi.useFetchArtworkByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isError: false,
      isFetching: true,
      isLoading: true,
      refetch: jest.fn(),
    });

    renderWithRouter();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    (ArtworkApi.useFetchArtworkByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: 'Internal Server Error',
      isError: true,
      isFetching: false,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithRouter();
    const el = await screen.findByText(/Internal Server Error/i);
    expect(el).toBeInTheDocument();
  });
});
