import { render, screen } from '@testing-library/react';

import { Fallback } from '../Fallback';
import { ErrorBoundary } from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders fallback UI when child throws error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Ooops, something went wrong! Try to refresh the page./i)
    ).toBeInTheDocument();
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <div>All good</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/All good/i)).toBeInTheDocument();
  });
});
