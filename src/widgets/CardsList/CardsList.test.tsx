import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/store.ts';
import { mockArtworkData } from 'shared/utils/test-utils/mock-data.ts';

import { CardsList } from './CardsList.tsx';

const mockOnSelectedItem = jest.fn();
const mockSelectedId = '';

describe('CardsList', () => {
  it('Cards should be rendered', () => {
    render(
      <Provider store={store}>
        <CardsList
          data={mockArtworkData}
          onSelectedItem={mockOnSelectedItem}
          selectedId={mockSelectedId}
        />
      </Provider>
    );
    expect(screen.getByText('Camille Pissarro')).toBeInTheDocument();
    expect(
      screen.getByText('State Birds and Flowers Quilt')
    ).toBeInTheDocument();
  });

  it('correct message should be displayed for an empty array', () => {
    render(
      <Provider store={store}>
        <CardsList
          data={[]}
          onSelectedItem={mockOnSelectedItem}
          selectedId={mockSelectedId}
        />
      </Provider>
    );
    expect(
      screen.getByText(/No artworks matching your request were found/i)
    ).toBeInTheDocument();
  });

  it('displays placeholder if image_id is missing', () => {
    render(
      <Provider store={store}>
        <CardsList
          data={mockArtworkData}
          onSelectedItem={mockOnSelectedItem}
          selectedId={mockSelectedId}
        />
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <CardsList
          data={mockArtworkData}
          onSelectedItem={mockOnSelectedItem}
          selectedId={mockSelectedId}
        />
      </Provider>
    );
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
