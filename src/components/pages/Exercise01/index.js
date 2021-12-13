/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 *[OK] 1. Add a movie to the cart
 *[OK] 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 *[OK] 3. Calculate and show the total cost of your cart. Ex: Total: $150
 *[OK] 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState } from "react";
import { Movies } from "./components/Movies";
import Cart from "./components/Cart";
import { moviesMock } from "./mock";

export default function Exercise01() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 2,
    },
  ]);
  const [movies] = useState(moviesMock);

  const addMovieToCart = (movie) => {
    const tmp_cart = [...cart];
    const index = cart.findIndex((m) => m.id === movie.id);
    if (index === -1) {
      tmp_cart.push({ ...movie, quantity: 1 });
    } else {
      tmp_cart[index].quantity = tmp_cart[index].quantity + 1;
    }
    setCart(tmp_cart);
  };

  const removeMovieFromCart = (movie) => {
    const tmp_cart = [...cart];
    const index = cart.findIndex((m) => m.id === movie.id);
    if (index >= 0) {
      if (tmp_cart[index].quantity > 1) {
        tmp_cart[index].quantity = tmp_cart[index].quantity - 1;
      } else {
        tmp_cart.pop(movie);
      }
    }
    setCart(tmp_cart);
  };

  return (
    <section className="exercise01">
      <Movies movies={movies} addMovieToCart={addMovieToCart} />
      <Cart
        cart={cart}
        setCart={setCart}
        add={addMovieToCart}
        remove={removeMovieFromCart}
      />
    </section>
  );
}
