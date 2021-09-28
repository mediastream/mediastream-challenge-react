/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart --DONE
 *
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart --DONE
 *
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState, useEffect } from "react";

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

const cart = [
  {
    id: 1,
    name: "Star Wars",
    price: 20,
    quantity: 2,
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

export default function Exercise01() {
  const [myCart, setMyCart] = useState(cart);

  const addMovieToCart = (movie) => {
    const movieAdded = { ...movie, quantity: 1 };
    setMyCart([...myCart, movieAdded]);
  };

  const handleQuantity = (type, movie) => {
    if (type === "increment") return { ...movie, quantity: movie.quantity + 1 };
    if (type === "decrement") return { ...movie, quantity: movie.quantity - 1 };
  };

  const incrementMovieQuantity = ({ id }) => {
    setMyCart(
      myCart.map((movie) => {
        return movie.id === id
          ? handleQuantity("increment", movie)
          : { ...movie };
      })
    );
  };

  const decreaseMovieQuantity = ({ id }) => {
    setMyCart(
      myCart.map((movie) => {
        return movie.id === id
          ? handleQuantity("decrement", movie)
          : { ...movie };
      })
    );

    myCart.map((movie) => {
      if (movie.quantity <= 1) {
        setMyCart(myCart.filter((el) => el.id != movie.id));
      }
    });
  };

  const getTotal = () => 6; // TODO: Implement this

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addMovieToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {myCart.map((movie) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decreaseMovieQuantity(movie)}>-</button>
                <span>{movie.quantity}</span>
                <button onClick={() => incrementMovieQuantity(movie)}>+</button>
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

//() => console.log("Add to cart", o)
//() => console.log("Increment quantity", movie)
