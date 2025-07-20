import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Header', () => {
  it('should render input and button elements', () => {
    render(<Header onChange={() => {}} onSearch={() => {}} value="" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('input should display the value from props', () => {
    render(<Header onChange={() => {}} onSearch={() => {}} value="query" />);
    expect(screen.getByRole('textbox')).toHaveValue('query');
  });

  it('onChange callback should be called with the correct parameter', () => {
    const handleChange = jest.fn();
    render(<Header onChange={handleChange} onSearch={() => {}} value="" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledWith('abc');
  });

  it('onSearch should be called when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(<Header onChange={() => {}} onSearch={handleSearch} value="" />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearch).toHaveBeenCalled();
  });

  it('onSearch should be called when Enter key is pressed', () => {
    const handleSearch = jest.fn();
    render(<Header onChange={() => {}} onSearch={handleSearch} value="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.keyDown(input, { charCode: 13, code: 'Enter', key: 'Enter' });
    expect(handleSearch).toHaveBeenCalled();
  });

  it('onSearch should not be called when other than Enter key is pressed', () => {
    const handleSearch = jest.fn();
    render(<Header onChange={() => {}} onSearch={handleSearch} value="" />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { charCode: 65, code: 'KeyA', key: 'a' });
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
