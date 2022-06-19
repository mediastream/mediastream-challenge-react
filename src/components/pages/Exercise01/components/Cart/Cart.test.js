/** @format */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Cart from '.';

const cart = [
  {
    id: 1,
    name: 'test movie one',
    price: 20,
    quantity: 2,
  },
  {
    id: 2,
    name: 'test movie two',
    price: 30,
    quantity: 3,
  },
];

const handleIncrementOrDecrement = jest.fn();

const calculateTotal = () => {
  return cart.reduce((total, el) => total + el.price * el.quantity, 0);
};

describe('Cart component', () => {
  beforeEach(() => {
    render(
      <Cart
        cart={cart}
        discountRules={[]}
        onIncrementDecrementClick={handleIncrementOrDecrement}
      />
    );
  });

  it('Should render component', function () {
    expect(screen.getByText(/test movie one/i)).toBeTruthy();
  });

  it('Should render two element in the list', () => {
    expect(screen.getAllByTestId('movies-cart-card')).toHaveLength(cart.length);
  });

  it('Should fire increment event', () => {
    fireEvent.click(screen.getAllByText('+')[0]);
  });

  it('Should fire decrement event', () => {
    fireEvent.click(screen.getAllByText('-')[0]);
  });

  it('Should calculate the cart total without discount', () => {
    const total = calculateTotal();

    expect(screen.getByText(`Total: $${total}`)).toBeTruthy();
  });

  it('Should calculate the cart total with 10% discount', () => {
    const rules = [
      {
        moviesIds: [1, 2],
        discount: 0.1,
      },
    ];

    const { getByText } = render(
      <Cart
        cart={cart}
        discountRules={[
          {
            moviesIds: [1, 2],
            discount: 0.1,
          },
        ]}
        onIncrementDecrementClick={handleIncrementOrDecrement}
      />
    );
    let total = calculateTotal();

    total -= total * rules[0].discount;

    expect(getByText(`Total: $${total}`)).toBeTruthy();
  });
});
