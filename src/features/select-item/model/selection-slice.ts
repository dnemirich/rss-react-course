import { createSlice } from '@reduxjs/toolkit';

export const selectionSlice = createSlice({
  initialState: {
    selected: [] as number[],
  },
  name: 'selection',
  reducers: (create) => ({
    clearSelection: create.reducer((state) => {
      state.selected = [];
    }),
    toggleSelection: create.reducer<{ selectedId: number }>((state, action) => {
      const { selectedId } = action.payload;
      if (state.selected.includes(selectedId)) {
        state.selected = state.selected.filter((id) => id !== selectedId);
      } else {
        state.selected.push(selectedId);
      }
    }),
  }),
  selectors: {
    getSelectedItems: (state) => state.selected,
    isSelected: (state, id: number) => state.selected.includes(id),
  },
});

export const selectionReducer = selectionSlice.reducer;
export const { clearSelection, toggleSelection } = selectionSlice.actions;
export const { getSelectedItems, isSelected } = selectionSlice.selectors;
export type SelectionInitialState = ReturnType<
  typeof selectionSlice.getInitialState
>;
