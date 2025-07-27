import { render, screen, waitFor } from '@testing-library/react';
import { fetchArtworkById } from 'entities/artwork';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockArtworkData } from 'shared/utils/test-utils/mock-data.ts';

import { Details } from './Details';

jest.mock('entities/artwork', () => ({
  ...jest.requireActual('entities/artwork'),
  fetchArtworkById: jest.fn(),
}));

describe('Details component', () => {
  const mockArtwork = mockArtworkData[0];

  const renderWithRouter = (
    detailsId = mockArtwork.id.toString(),
    page = '1'
  ) => {
    render(
      <MemoryRouter initialEntries={[`/details/${detailsId}/${page}`]}>
        <Routes>
          <Route element={<Details />} path="/details/:detailsId/:page" />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders artwork details', async () => {
    (fetchArtworkById as jest.Mock).mockResolvedValue({ data: mockArtwork });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(mockArtwork.title)).toBeInTheDocument();
    });

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
});
