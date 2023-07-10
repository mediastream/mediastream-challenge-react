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

import "./assets/styles.css";
import { useState } from "react";
import { MOVIES, DISCOUNT_RULES } from "../../../constants";

export default function Exercise01() {
  const [cart, setCart] = useState([]);

  const addMovie = (movie) => {
    const findMovie = cart.find((item) => item.id === movie.id);
    if (!!findMovie) {
      const updatedCart = (myCart) =>
        myCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...movie, quantity: 1 }]);
    }
  };

  const removeMovie = (movie) => {
    const findMovie = cart.find((item) => item.id === movie.id);
    let updatedCart;
    if (findMovie.quantity > 1) {
      updatedCart = (myCart) =>
        myCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      setCart(updatedCart);
    } else {
      updatedCart = (myCart) => myCart.filter((item) => item.id !== movie.id);
      setCart(updatedCart);
    }
  };

  const getTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    DISCOUNT_RULES.forEach((rule) => {
      const applyDiscount = rule.m.every((ruleId) =>
        cart.some((cartItem) => cartItem.id === ruleId)
      );
      if (applyDiscount) {
        const discountAmmount = total - total * rule.discount;
        total = discountAmmount;
      }
    });

    return total;
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {MOVIES.map((movie) => (
            <li className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addMovie(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((movie) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => removeMovie(movie)}>-</button>
                <span>{movie.quantity}</span>
                <button onClick={() => addMovie(movie)}>+</button>
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
