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

import { useState, useCallback } from 'react';
import { movies, discountRules } from './providers/data';
import { constants } from './utils/contants';

import './assets/styles.css';

export default function Exercise01() {

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ]);

  const {
    ID,
    NAME,
    PRICE,
    ADD_TO_CART,
    SYMBOLS,
    TOTAL } = constants;

  const { SUM, SUBSTRACT } = SYMBOLS;

  const calculatePrice = (price, quantity) => price * quantity;

  const changeAmount = useCallback(
    (id, amount) => {
      return cart.map(item => {
        if (item.id === id) {
          return ({
            ...item,
            quantity: item.quantity + amount,
          });
        } else {
          return item;
        }
      })
    },
    [cart],
  );

  const addMovieToCart = (movie) => {
    const foundMovie = cart.find(item => item.id === movie.id);

    if (!foundMovie) {
      const newMovie = {
        ...movie,
        quantity: 1,
      }
      setCart([...cart, newMovie]);
    } else {
      setCart(changeAmount(movie.id, 1))
    }
  };

  const incrementQuantity = (movieId) => {
    setCart(changeAmount(movieId, 1));
  };

  const decrementQuantity = (movieId) => {
    const foundMovie = cart.find(movie => movie.id === movieId);

    if (foundMovie.quantity - 1 === 0) {
      setCart(cart.filter(movie => movie.id !== movieId));
    } else {
      setCart(changeAmount(movieId, -1));
    }
  };

  const getTotal = () => {

    const subTotal = cart.reduce((accTotal, movie) => {
      accTotal += movie.price * movie.quantity;
      return accTotal;
    }, 0);

    const applyingDiscounts = discountRules.map(discountRule => ({
      ids: discountRule.m.map(item => !!cart.find(movie => movie.id === item)),
      discount: discountRule.discount,
    }));

    const totalDiscount = applyingDiscounts.filter(item => item.ids.every(id => id))
      .map(item => ({ calculatedDiscount: subTotal * item.discount }))
      .reduce((acc, value) => acc + value.calculatedDiscount, 0);

    return subTotal - totalDiscount;
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>
                  {ID}: {movie.id}
                </li>
                <li>
                  {NAME}: {movie.name}
                </li>
                <li>
                  {PRICE}: ${movie.price}
                </li>
              </ul>
              <button onClick={() => addMovieToCart(movie)}>
                {ADD_TO_CART}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(movie => (
            <li key={movie.id} className="movies__cart-card">
              <ul>
                <li>
                  {ID}: {movie.id}
                </li>
                <li>
                  {NAME}: {movie.name}
                </li>
                <li>
                  {PRICE}: ${calculatePrice(movie.price, movie.quantity)}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(movie.id)}>
                  {SUBSTRACT}
                </button>
                <span>
                  {movie.quantity}
                </span>
                <button onClick={() => incrementQuantity(movie.id)}>
                  {SUM}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>{TOTAL}: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
};
