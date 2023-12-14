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
import MovieList from "./components/MovieList";
import ShoppingCart from "./components/ShoppingCart";
import { movies, discountRules } from "./constants/exercise01_constants";
import { formatCurrency } from "./utils/formatCurrency";

export default function Exercise01() {
  const [cart, setCart] = useState([]);

  const addToCart = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...movie, quantity: 1 }]);
    }
  };

  const removeFromCart = (movie) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const applicableDiscount = discountRules.find((rule) =>
      rule.m.every((movieId) => cart.some((item) => item.id === movieId))
    );
    const discount = applicableDiscount ? applicableDiscount.discount : 0;

    return subtotal * (1 - discount);
  };

  return (
    <section className='exercise01'>
      <MovieList movies={movies} addToCart={addToCart} />
      <ShoppingCart
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
      />
      <div className='movies__cart-total'>
        <p>Total: {formatCurrency(getTotal())}</p>
      </div>
    </section>
  );
}
