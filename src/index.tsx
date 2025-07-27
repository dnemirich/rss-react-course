import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Fallback } from './components/Fallback/Fallback.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<Fallback />}>
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<App />} path=":page" />
          <Route element={<App />} path=":page/:detailsId" />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
