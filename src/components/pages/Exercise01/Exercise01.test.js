/** @format */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Exercise from '.';

import { MOVIES } from "./constants"


describe('Cart component', () => {
  beforeEach(() => {
    render(
      <Exercise />
    );
  });

  it('Should render a list of movies', () => {
    expect(screen.getAllByTestId('movies-card')).toHaveLength(MOVIES.length);
  });

  it('Should default a list of cart movies', () => {
    expect(screen.getAllByTestId('movies-cart-card')).toHaveLength(1);
  });

  it('Should fire add to card event', () => {
    expect(screen.getByText(`Total: $40`)).toBeTruthy();

    fireEvent.click(screen.getAllByText(/Add to cart/)[0]);
  
    expect(screen.getByText(`Total: $60`)).toBeTruthy();
  });

  it('Should remove all element of cart', () => {
    expect(screen.getAllByTestId('movies-cart-card')).toBeTruthy();
    fireEvent.click(screen.getAllByText("-")[0]);
    fireEvent.click(screen.getAllByText("-")[0]);
    expect(screen.queryByTestId("movies-cart-card'")).toBeNull();
  });
});
