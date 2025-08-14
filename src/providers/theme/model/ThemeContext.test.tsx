import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider, useTheme } from './ThemeContext.tsx';

describe('ThemeProvider', () => {
  const matchMediaMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query) => ({
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        dispatchEvent: jest.fn(),
        matches:
          query === '(prefers-color-scheme: dark)' ? matchMediaMock() : false,
        media: query,
        onchange: null,
        removeEventListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true,
    });
  });

  beforeEach(() => {
    matchMediaMock.mockReturnValue(false);
    document.documentElement.dataset.theme = '';
  });

  const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <>
        <div data-testid="theme">{theme}</div>
        <button onClick={toggleTheme}>Toggle</button>
      </>
    );
  };

  it('initializes with light theme if system preference is light', () => {
    matchMediaMock.mockReturnValue(false);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('initializes with dark theme if system preference is dark', () => {
    matchMediaMock.mockReturnValue(true);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('toggles theme and updates data-theme attribute', async () => {
    matchMediaMock.mockReturnValue(false);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const btn = screen.getByRole('button', { name: /toggle/i });
    const themeDiv = screen.getByTestId('theme');

    expect(themeDiv.textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');

    await userEvent.click(btn);

    expect(themeDiv.textContent).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    await userEvent.click(btn);

    expect(themeDiv.textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
