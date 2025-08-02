import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'shared/styles/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'shared/lib/store.ts';
import { ErrorBoundary } from 'shared/ui/ErrorBoundary';
import { Fallback } from 'shared/ui/Fallback';

import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<Fallback />}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
