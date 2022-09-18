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

  const getTotal = () => {
    const price = cart.reduce(
      (total, current) => total + current.price * current.quantity,
      0
    );

    const discount = discountRules.reduce((total, current) => {
      const isDiscountIn = current.m.reduce(
        (isInDiscount, movieId) =>
          isInDiscount
            ? cart.find((item) => item.id === movieId)
            : isInDiscount,
        true
      );
      if (isDiscountIn) {
        total = total + current.discount;
      }
      return total;
    }, 0);
    return price - price * discount;
  };

  const handleAddToCart = (item) => {
    const cartIndex = cart.map((cartItem) => cartItem.id).indexOf(item.id);
    console.log(cartIndex);
    if (cartIndex === -1) {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    } else {
      const newCart = [...cart];
      newCart[cartIndex] = {
        ...newCart[cartIndex],
        quantity: newCart[cartIndex].quantity + 1,
      };
      setCart(newCart);
    }
  };

  const handleRemoveFromCart = (cartIndex) => {
    const newCart = [...cart];
    newCart[cartIndex] = {
      ...newCart[cartIndex],
      quantity: newCart[cartIndex].quantity - 1,
    };

    setCart(newCart.filter((item) => item.quantity));
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li className="movies__list-card" key={movie.id}>
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => handleAddToCart(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((movie, index) => (
            <li className="movies__cart-card" key={movie.id}>
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleRemoveFromCart(index)}>-</button>
                <span>{movie.quantity}</span>
                <button onClick={() => handleAddToCart(movie)}>+</button>
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
