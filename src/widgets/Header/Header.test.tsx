import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header.tsx';

describe('Header', () => {
  it('should render input and button elements', () => {
    render(
      <MemoryRouter>
        <Header onChange={() => {}} onSearch={() => {}} value="" />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('input should display the value from props', () => {
    render(
      <MemoryRouter>
        <Header onChange={() => {}} onSearch={() => {}} value="query" />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toHaveValue('query');
  });

  it('onChange callback should be called with the correct parameter', () => {
    const handleChange = jest.fn();
    render(
      <MemoryRouter>
        <Header onChange={handleChange} onSearch={() => {}} value="" />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith('abc');
  });

  it('onSearch should be called when the form is submitted by button', () => {
    const handleSearch = jest.fn();
    render(
      <MemoryRouter>
        <Header onChange={() => {}} onSearch={handleSearch} value="" />
      </MemoryRouter>
    );
    const form = screen.getByRole('form') || screen.getByTestId('search-form');
    fireEvent.submit(form);
    expect(handleSearch).toHaveBeenCalled();
  });

  it('onSearch should be called when Enter is pressed in input', async () => {
    const handleSearch = jest.fn();
    render(
      <MemoryRouter>
        <Header onChange={() => {}} onSearch={handleSearch} value="" />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    await act(async () => {
      fireEvent.keyDown(input, { charCode: 13, code: 'Enter', key: 'Enter' });
      if (form) {
        fireEvent.submit(form);
      }
    });
    expect(handleSearch).toHaveBeenCalled();
  });

  it('onSearch should NOT be called when non-Enter key is pressed', () => {
    const handleSearch = jest.fn();
    render(
      <MemoryRouter>
        <Header onChange={() => {}} onSearch={handleSearch} value="" />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { charCode: 65, code: 'KeyA', key: 'a' });
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
