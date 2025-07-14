import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Fallback } from './components/Fallback.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
