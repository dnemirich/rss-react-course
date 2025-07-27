import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  const setup = (currentPage: number, totalPages: number = 5) => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    );
    return { onPageChange };
  };

  it('renders current and total pages', () => {
    setup(2, 10);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    setup(1, 5);
    const prevBtn = screen.getAllByRole('button')[0];
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    setup(5, 5);
    const nextBtn = screen.getAllByRole('button')[1];
    expect(nextBtn).toBeDisabled();
  });

  it('calls onPageChange with previous page on left arrow click', () => {
    const { onPageChange } = setup(3, 5);
    const prevBtn = screen.getAllByRole('button')[0];

    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page on right arrow click', () => {
    const { onPageChange } = setup(2, 5);
    const nextBtn = screen.getAllByRole('button')[1];

    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when on first or last page', () => {
    const { onPageChange } = setup(1, 1);
    const [prevBtn, nextBtn] = screen.getAllByRole('button');

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
