import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'shared/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'shared/ui/ErrorBoundary';
import { Fallback } from 'shared/ui/Fallback';

import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<Fallback />}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
