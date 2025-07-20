import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';

import {
  mockCharacterData,
  mockCharacterDataExtended,
} from '../../test-utils/mock-data.ts';
import { CardsList } from './CardsList';

describe('CardsList', () => {
  it('Cards should be rendered', () => {
    render(<CardsList data={mockCharacterData} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('correct message should be displayed for an empty array', () => {
    render(<CardsList data={[]} />);
    expect(
      screen.getByText(/No characters matching your request were found/i)
    ).toBeInTheDocument();
  });

  it('Correct description should be added', () => {
    render(<CardsList data={mockCharacterData} />);
    const cardItems = screen.getAllByRole('listitem');
    const secondCard = cardItems[1];
    expect(within(secondCard).getByText(/No description/i)).toBeInTheDocument();
    expect(
      within(cardItems[0]).queryByText(/No description/i)
    ).not.toBeInTheDocument();
  });

  it('Additional info should be rendered', () => {
    render(<CardsList data={mockCharacterDataExtended} />);
    const card = screen.getByRole('listitem');

    expect(within(card).getByText(/birth year:/i)).toBeInTheDocument();
    expect(within(card).getByText('41.9BBY')).toBeInTheDocument();

    expect(within(card).getByText(/eye color:/i)).toBeInTheDocument();
    expect(within(card).getByText('yellow')).toBeInTheDocument();

    expect(within(card).getByText(/gender:/i)).toBeInTheDocument();
    expect(within(card).getByText('male')).toBeInTheDocument();

    expect(within(card).getByText(/hair color:/i)).toBeInTheDocument();
    expect(within(card).getByText('none')).toBeInTheDocument();

    expect(within(card).getByText(/height:/i)).toBeInTheDocument();
    expect(within(card).getByText('202')).toBeInTheDocument();

    expect(within(card).getByText(/mass:/i)).toBeInTheDocument();
    expect(within(card).getByText('136')).toBeInTheDocument();

    expect(within(card).getByText(/skin color:/i)).toBeInTheDocument();
    expect(within(card).getByText('white')).toBeInTheDocument();
  });
});
