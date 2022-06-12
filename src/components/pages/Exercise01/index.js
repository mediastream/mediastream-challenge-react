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
import { movies, discountRules } from "./movies";

export default function Exercise01() {
  const [cart, setCart] = useState([]);

  const addCart = (movie) => {
    const auxMovie = cart.find((m) => m.id === movie.id);
    if (auxMovie) {
      const newCart = cart.filter(({ id }) => id !== auxMovie.id);
      setCart([
        ...newCart,
        {
          ...auxMovie,
          quantity: auxMovie.quantity + 1,
        },
      ]);
    } else {
      setCart([...cart, { quantity: 1, ...movie }]);
    }
  };

  const incrementQuantity = (movie) => {
    const auxMovie = cart.find((m) => m.id === movie.id);
    const newCart = cart.map((m) =>
      m.id === auxMovie.id
        ? { ...auxMovie, quantity: auxMovie.quantity + 1 }
        : m
    );
    setCart(newCart);
  };

  const decrementQuantity = (movie) => {
    const auxMovie = cart.find((m) => m.id === movie.id);
    if (auxMovie.quantity === 1) {
      const newCart = cart.filter((m) => m.id !== auxMovie.id);
      setCart(newCart);
    } else {
      const newCart = cart.map((m) =>
        m.id === auxMovie.id
          ? { ...auxMovie, quantity: auxMovie.quantity - 1 }
          : m
      );
      setCart(newCart);
    }
  };

  const getTotal = () => {
    let total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const ids = cart.reduce((acc, curr) => [...acc, curr.id], []);
    discountRules.forEach((value) => {
      if (value.m.sort().every((v, i) => v === ids.sort()[i])) {
        total -= total * value.discount;
      }
    });
    return total;
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        {" "}
        <ul>
          {cart.map((x) => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(x)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => incrementQuantity(x)}>+</button>
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
