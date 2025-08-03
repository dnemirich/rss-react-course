import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDetailedArtworkData } from 'shared/utils/test-utils/mock-data.ts';

import type { Artwork } from '../../model';

import { ArtworkCard } from './ArtworkCard';

describe('ArtworkCard', () => {
  const item: Artwork = mockDetailedArtworkData;
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, artist and date', () => {
    render(<ArtworkCard item={item} onClick={mockOnClick} selectedId={''} />);
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.artist_title)).toBeInTheDocument();
    expect(screen.getByText(item.date_display)).toBeInTheDocument();
  });

  it('shows image when image_id is present with correct alt and src', () => {
    render(<ArtworkCard item={item} onClick={mockOnClick} selectedId={''} />);
    const img = screen.getByAltText(item.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    if (item.image_id) {
      expect(img.src).toContain(item.image_id);
    }
  });

  it('displays placeholder if image_id is missing', () => {
    const noImageItem: Artwork = { ...item, image_id: null };

    render(
      <ArtworkCard item={noImageItem} onClick={mockOnClick} selectedId={''} />
    );

    expect(screen.getByText(/Image is not available/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('calls onClick with the correct id when clicked', async () => {
    const user = userEvent.setup();
    render(<ArtworkCard item={item} onClick={mockOnClick} selectedId={''} />);
    const card = screen.getByRole('button');
    await user.click(card);
    expect(mockOnClick).toHaveBeenCalledWith(item.id);
  });

  it('applies selected styling when selectedId matches item id', () => {
    render(
      <ArtworkCard
        item={item}
        onClick={mockOnClick}
        selectedId={String(item.id)}
      />
    );
    const card = screen.getByRole('button');
    expect(card).toHaveClass('ring-4');
  });

  it('does not apply selected styling when selectedId does not match', () => {
    render(
      <ArtworkCard item={item} onClick={mockOnClick} selectedId={'999'} />
    );
    const card = screen.getByRole('button');
    expect(card).not.toHaveClass('ring-4');
  });
});
