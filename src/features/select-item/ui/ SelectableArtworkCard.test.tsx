import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/store.ts';
import { mockDetailedArtworkData } from 'shared/utils/test-utils/mock-data';

import { SelectableArtworkCard } from './SelectableArtworkCard';

describe('SelectableArtworkCard', () => {
  const mockOnClick = jest.fn();

  it('checkbox toggles selection when clicked', () => {
    render(
      <Provider store={store}>
        <SelectableArtworkCard
          item={mockDetailedArtworkData}
          onClick={mockOnClick}
          selectedId=""
        />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox', {
      name: `Select artwork ${mockDetailedArtworkData.title}`,
    });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(store.getState().selection.selected).toContainEqual(
      mockDetailedArtworkData
    );

    fireEvent.click(checkbox);

    expect(store.getState().selection.selected).not.toContainEqual(
      mockDetailedArtworkData
    );
  });
});
