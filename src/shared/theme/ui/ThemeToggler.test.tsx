import { fireEvent, render, screen } from '@testing-library/react';

import { useTheme } from '../model';
import { ThemeToggler } from './ThemeToggler';

jest.mock('../model', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggler', () => {
  it('renders SunIcon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggler />);

    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('renders MoonIcon when theme is not dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggler />);

    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('calls toggleTheme on button click', () => {
    const toggleThemeMock = jest.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeToggler />);

    fireEvent.click(screen.getByRole('button'));

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
