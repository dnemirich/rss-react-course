import type { Artwork } from 'entities/artwork';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const selectionSlice = createSlice({
  initialState: {
    selected: [] as Artwork[],
  },
  name: 'selection',
  reducers: {
    clearSelection(state) {
      state.selected = [];
    },
    toggleSelection(state, action: PayloadAction<{ selectedItem: Artwork }>) {
      const { selectedItem } = action.payload;
      const exists = state.selected.some((item) => item.id === selectedItem.id);
      if (exists) {
        state.selected = state.selected.filter(
          (item) => item.id !== selectedItem.id
        );
      } else {
        state.selected.push(selectedItem);
      }
    },
  },
  selectors: {
    getSelectedItems: (state) => state.selected,
    isSelected: (state, id: number) =>
      state.selected.some((item) => item.id === id),
  },
});

export const { clearSelection, toggleSelection } = selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;

export const { getSelectedItems, isSelected } = selectionSlice.selectors;

export type SelectionInitialState = ReturnType<
  typeof selectionSlice.getInitialState
>;
