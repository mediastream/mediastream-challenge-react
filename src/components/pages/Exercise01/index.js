/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useMemo, useState } from 'react'

const movies = [
  {
    id: 1,
    name: 'Star Wars',
    price: 20
  },
  {
    id: 2,
    name: 'Minions',
    price: 25
  },
  {
    id: 3,
    name: 'Fast and Furious',
    price: 10
  },
  {
    id: 4,
    name: 'The Lord of the Rings',
    price: 5
  }
];

const moviesById = Object.fromEntries(movies.map(m => [m.id, m]));

const discountRules = [
  {
    m: [3, 2],
    discount: 0.25
  },
  {
    m: [2, 4, 1],
    discount: 0.5
  },
  {
    m: [4, 2],
    discount: 0.1
  } 
];

export default function Exercise01 () {
  const [cart, setCart] = useState([
    { id: 1, quantity: 2 },
    { id: 2, quantity: 0 },
    { id: 3, quantity: 0 },
    { id: 4, quantity: 0 },
  ]);

  const getTotal = () => 0 // TODO: Implement this

  const changeQuantity = (id, newQuantity) => {
    setCart(cart.map(c => c.id == id ? { id, quantity: Math.max(0, newQuantity)} : c));
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => changeQuantity(o.id, 1)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(({ id, quantity }) => {
            if (quantity == 0) return;

            const movie = moviesById[id];
            return <li className="movies__cart-card">
              <ul>
                <li>
                  ID: {movie.id}
                </li>
                <li>
                  Name: {movie.name}
                </li>
                <li>
                  Price: ${movie.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => changeQuantity(id, quantity - 1)}>
                  -
                </button>
                <span>
                  {quantity}
                </span>
                <button onClick={() => changeQuantity(id, quantity + 1)}>
                  +
                </button>
              </div>
            </li>;
          })}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
