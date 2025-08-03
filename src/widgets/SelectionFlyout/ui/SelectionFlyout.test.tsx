import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { clearSelection, selectionReducer } from 'features/select-item';
import { Provider } from 'react-redux';
import { mockDetailedArtworkData } from 'shared/utils/test-utils/mock-data';

import { exportCsv } from '../lib';
import { SelectionFlyout } from './SelectionFlyout';

jest.mock('../lib', () => ({
  exportCsv: jest.fn(),
}));

const store = configureStore({
  preloadedState: {
    selection: {
      selected: [mockDetailedArtworkData],
    },
  },
  reducer: {
    selection: selectionReducer,
  },
});

describe('SelectionFlyout ui', () => {
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays correct selected items count and label', () => {
    const selectedItems = [mockDetailedArtworkData];
    render(
      <SelectionFlyout onClear={mockOnClear} selectedItems={selectedItems} />
    );

    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();

    render(
      <SelectionFlyout
        onClear={mockOnClear}
        selectedItems={[mockDetailedArtworkData, mockDetailedArtworkData]}
      />
    );
    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });

  it('calls exportCsv with selected items on Download click', () => {
    const selectedItems = [mockDetailedArtworkData];
    render(
      <SelectionFlyout onClear={mockOnClear} selectedItems={selectedItems} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Download/i }));

    expect(exportCsv).toHaveBeenCalledTimes(1);
    expect(exportCsv).toHaveBeenCalledWith(selectedItems);
  });

  it('calls onClear on Unselect all click', () => {
    const selectedItems = [mockDetailedArtworkData];
    render(
      <SelectionFlyout onClear={mockOnClear} selectedItems={selectedItems} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});

describe('SelectionFlyout integration with Redux', () => {
  it('clears store after clicking Unselect all', () => {
    const onClear = () => store.dispatch(clearSelection());

    render(
      <Provider store={store}>
        <SelectionFlyout
          onClear={onClear}
          selectedItems={store.getState().selection.selected}
        />
      </Provider>
    );

    expect(store.getState().selection.selected.length).toBe(1);

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));

    expect(store.getState().selection.selected.length).toBe(0);
  });
});
