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
import { useMemo, useState } from "react";

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 2,
    },
  ]);

  const getTotal = useMemo(() => {
    // Calculate total
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });

    // Apply discounts
    let discount = 0;
    discountRules.forEach((rule) => {
      const hasAllMovies = rule.m.every((movieId) =>
        cart.some((cartItem) => cartItem.id === movieId)
      );
      if (hasAllMovies) {
        discount += rule.discount;
      }
    });
    total -= total * discount;
    return total;
  }, [cart]);

  const addToCart = (movie) => {
    // check if movie is already in cart
    const movieInCart = cart.find((x) => x.id === movie.id);
    if (movieInCart) {
      // increment quantity
      setCart(
        cart.map((x) =>
          x.id === movie.id
            ? { ...movieInCart, quantity: movieInCart.quantity + 1 }
            : x
        )
      );
    } else {
      // add movie to cart
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  };

  const incrementQuantity = (movie) => {
    // increment quantity
    setCart(
      cart.map((x) =>
        x.id === movie.id ? { ...movie, quantity: movie.quantity + 1 } : x
      )
    );
  };

  const decrementQuantity = (movie) => {
    if (movie.quantity === 1) {
      // remove movie from cart
      setCart(cart.filter((movieInCart) => movieInCart.id !== movie.id));
      return;
    }
    // decrement quantity
    setCart(
      cart.map((movieInCart) =>
        movieInCart.id === movie.id
          ? { ...movie, quantity: movie.quantity - 1 }
          : movieInCart
      )
    );
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cartItem, index) => (
            <li key={index} className="movies__cart-card">
              <ul>
                <li>ID: {cartItem.id}</li>
                <li>Name: {cartItem.name}</li>
                <li>Price: ${cartItem.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(cartItem)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => incrementQuantity(cartItem)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal}</p>
        </div>
      </div>
    </section>
  );
}
