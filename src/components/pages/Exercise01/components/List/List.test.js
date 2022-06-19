/** @format */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import List from '.';

const handleOnAddCartClick = jest.fn();

const movies = [
  {
    id: 1,
    name: 'movie test one',
    price: 20,
  },
  {
    id: 2,
    name: 'movie test two',
    price: 25,
  },
];

describe('Cart component', () => {
  beforeEach(() => {
    render(
      <List
        movies={movies}
        onAddCartClick={handleOnAddCartClick}
      />
    );
  });

  it('Should render component', function () {
    expect(screen.getByText(/movie test one/i)).toBeTruthy();
    expect(screen.getByText(/movie test two/i)).toBeTruthy();
  });

  it('Should render two element in the list', () => {
    expect(screen.getAllByTestId('movies-card')).toHaveLength(movies.length);
  });

  it('Should fire add to card event', () => {
    fireEvent.click(screen.getAllByText(/Add to cart/)[0]);
  });
});
