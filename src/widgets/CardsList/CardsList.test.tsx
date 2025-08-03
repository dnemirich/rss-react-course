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
});
