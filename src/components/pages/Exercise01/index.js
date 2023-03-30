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
import CartItem from "./CartItem";
import Movie from "./Movie";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);

  const getSubtotal = () => {
    let total = 0;
    for (const movie of cart) {
      total += movie.quantity * movie.price;
    }
    return total;
  };

  const getDiscount = () => {
    let discount = 0;
    const movies = cart.reduce(
      (acc, movie) => ({ ...acc, [movie.id]: movie }),
      {}
    );
    for (const item of discountRules) {
      if (item.m.length !== cart.length) {
        continue;
      }
      const isDiscount = item.m.every(
        (movieId) => movies[movieId] !== undefined
      );
      if (isDiscount) {
        discount = item.discount;
        break;
      }
    }

    return getSubtotal() * discount;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const handleChangeQuantity = (id, quantity) => {
    const cart_aux = [...cart];
    const existingItem = cart_aux.findIndex((item) => item.id === id);
    if (existingItem !== -1) {
      if (quantity === 1) {
        cart_aux[existingItem].quantity += 1;
      } else {
        if (cart_aux[existingItem].quantity === 1) {
          cart_aux.splice(existingItem, 1);
        } else {
          cart_aux[existingItem].quantity -= 1;
        }
      }
      setCart(cart_aux);
    }
  };

  const handleAddMovie = (movie) => {
    const cart_aux = [...cart];
    const existingItem = cart_aux.findIndex((item) => item.id === movie.id);
    if (existingItem === -1) {
      cart_aux.push({
        ...movie,
        quantity: 1,
      });
    } else {
      cart_aux[existingItem].quantity += 1;
    }
    setCart(cart_aux);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <Movie item={o} handleAdd={() => handleAddMovie(o)} key={o.id} />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <CartItem
              item={x}
              handleChangeQuantity={(q) => handleChangeQuantity(x.id, q)}
              key={x.id}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Subtotal: ${getSubtotal()}</p>
          <p>Discount: ${getDiscount()}</p>
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  );
}
