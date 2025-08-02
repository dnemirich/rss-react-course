import { configureStore } from '@reduxjs/toolkit';
import { selectionReducer } from 'features/select-item';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
