import { configureStore } from '@reduxjs/toolkit';
import { artworkApi } from 'entities/artwork';
import { selectionReducer } from 'features/select-item';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artworkApi.middleware),
  reducer: {
    [artworkApi.reducerPath]: artworkApi.reducer,
    selection: selectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
