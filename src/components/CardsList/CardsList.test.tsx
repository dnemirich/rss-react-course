import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';

import { mockArtworkData } from '../../test-utils/mock-data.ts';
import { CardsList } from './CardsList';

describe('CardsList', () => {
  it('Cards should be rendered', () => {
    render(<CardsList data={mockArtworkData} />);
    expect(screen.getByText('Camille Pissarro')).toBeInTheDocument();
    expect(
      screen.getByText('State Birds and Flowers Quilt')
    ).toBeInTheDocument();
  });

  it('correct message should be displayed for an empty array', () => {
    render(<CardsList data={[]} />);
    expect(
      screen.getByText(/No artworks matching your request were found/i)
    ).toBeInTheDocument();
  });

  it('displays placeholder if image_id is missing', () => {
    render(<CardsList data={mockArtworkData} />);
    const card = screen
      .getByText('Cupid and Psyche: Design for a Ceiling')
      .closest('li');
    expect(card).not.toBeNull();
    if (card) {
      expect(
        within(card).getByText(/Image is not available/i)
      ).toBeInTheDocument();
      expect(within(card).queryByRole('img')).toBeNull();
    }
  });

  it('all main info should be shown on the card', () => {
    render(<CardsList data={mockArtworkData} />);
    expect(screen.getByText('Camille Pissarro')).toBeInTheDocument();
    expect(
      screen.getByText('The Banks of the Marne in Winter')
    ).toBeInTheDocument();
    expect(screen.getByText('1866')).toBeInTheDocument();

    expect(screen.getByText('François Boucher')).toBeInTheDocument();
    expect(
      screen.getByText('Cupid and Psyche: Design for a Ceiling')
    ).toBeInTheDocument();
    expect(screen.getByText('c. 1740-1760')).toBeInTheDocument();
  });
});
