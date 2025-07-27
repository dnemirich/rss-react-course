import { render, screen } from '@testing-library/react';

import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders children correctly', () => {
    render(
      <MainLayout>
        <span>Test Child 1</span>
        <div>Test Child 2</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Child 1')).toBeInTheDocument();
    expect(screen.getByText('Test Child 2')).toBeInTheDocument();
  });
});
