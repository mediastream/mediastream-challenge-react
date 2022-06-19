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

import './assets/styles.css';
import { useState } from 'react';
import { MOVIES, DISCOUNT_RULES } from './constants';

/**
 * @typedef {Object} CartMovie
 * @property {number} id
 * @property {string} name
 * @property {number} number
 * @property {number} [quantity]
 */

export default function Exercise01() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2,
    },
  ]);

  /**
   *
   * @param {number} total
   *
   * @return {number}
   */
  const applyDiscount = (total) => {
    const cartIds = new Set(cart.map((cartMovie) => cartMovie.id));
    let totalWithDiscount = total;

    DISCOUNT_RULES.forEach((rule) => {
      let hasDiscount = true;
      for (const id of rule.moviesIds) {
        if (!cartIds.has(id)) {
          hasDiscount = false;
          break;
        }
      }
      if (hasDiscount) {
        totalWithDiscount -= total * rule.discount;
      }
    });

    return totalWithDiscount;
  };

  const getTotal = () => {
    if (cart.length === 0) {
      return 0;
    }

    const total = cart.reduce((total, movie) => {
      return total + movie.price * movie.quantity;
    }, 0);

    return applyDiscount(total);
  };

  /**
   *
   * @param {CartMovie[]} cartMovies
   * @param {number} id
   *
   * @return {CartMovie | undefined}
   */
  const searchMovieIndex = (cartMovies, id) => {
    return cartMovies.findIndex((cartMovie) => cartMovie.id === id);
  };

  /**
   * @param {CartMovie} movie
   *
   * @return {void}
   */
  const handleOnAddMovieClick = (movie) => {
    const cartMovies = [...cart];
    const index = searchMovieIndex(cartMovies, movie.id);

    if (index !== -1) {
      cartMovies[index].quantity++;
    } else {
      cartMovies.push({
        ...movie,
        quantity: 1,
      });
    }

    setCart(cartMovies);
  };

  /**
   *
   * @param {1 | -1} operation
   * @param {number} id
   *
   * @return
   */
  const handleOnIncrementOrDecrementClick = (operation, id) => {
    const cartMovies = [...cart];
    const index = searchMovieIndex(cartMovies, id);
    const movie = cartMovies[index];
    movie.quantity += operation;

    if (movie.quantity === 0) {
      cartMovies.splice(index, 1);
    }

    setCart(cartMovies);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {MOVIES.map((movie) => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => handleOnAddMovieClick(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cartMovie) => (
            <li key={cartMovie.id} className="movies__cart-card">
              <ul>
                <li>ID: {cartMovie.id}</li>
                <li>Name: {cartMovie.name}</li>
                <li>Price: ${cartMovie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button
                  onClick={() =>
                    handleOnIncrementOrDecrementClick(-1, cartMovie.id)
                  }
                >
                  -
                </button>
                <span>{cartMovie.quantity}</span>
                <button
                  onClick={() =>
                    handleOnIncrementOrDecrementClick(1, cartMovie.id)
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  );
}
