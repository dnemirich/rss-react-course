'use client';

import type { ReactNode } from 'react';

import { ErrorProvider } from 'providers/error';
import { ThemeProvider } from 'providers/theme';
import { Provider } from 'react-redux';
import { store } from 'shared/lib/store/store.ts';

export function ProviderComposer({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ErrorProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ErrorProvider>
    </Provider>
  );
}
