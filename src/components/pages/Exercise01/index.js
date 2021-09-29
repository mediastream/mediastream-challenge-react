/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart --DONE
 *
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart --DONE
 *
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150 --DONE
 *
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
  const [totalCart, setTotalCart] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    getTotal();
  });

  const addMovieToCart = (movie) => {
    const movieToAdd = { ...movie, quantity: 1 };
    const movieOnCart = myCart.find((el) => el.id === movie.id);
    if (movieOnCart) {
      alert("Movie already added in the Cart");
      return;
    }
    setMyCart([...myCart, movieToAdd]);
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

  const removeFromCart = (movieId) => {
    const { quantity } = myCart.find((el) => el.id === movieId);
    if (quantity === 1) {
      setMyCart(myCart.filter((el) => el.id !== movieId));
    }
  };

  const decreaseMovieQuantity = ({ id }) => {
    setMyCart(
      myCart.map((movie) => {
        return movie.id === id
          ? handleQuantity("decrement", movie)
          : { ...movie };
      })
    );
    removeFromCart(id);
  };

  function areArraysEqual(a1, a2) {
    const firstArrayCopy = a1.slice().sort();
    const secondArrayCopy = a2.slice().sort();
    if (JSON.stringify(firstArrayCopy) === JSON.stringify(secondArrayCopy)) {
      return true;
    }
    return false;
  }

  const applyDiscount = (localCart, discountList) => {
    for (let i = 0; i < localCart.length; i++) {
      for (let j = 0; j < discountList.length; j++) {
        let combinationForDiscount = discountList[j].m;
        let discountToApply = discountList[j].discount;
        const res = areArraysEqual(localCart, combinationForDiscount);
        if (res) {
          setDiscount(discountToApply);
          return;
        } else {
          setDiscount((prev) => (prev = 0));
        }
      }
    }
  };

  const getTotal = () => {
    const total = myCart.reduce((prev, current) => {
      return prev + current.price * current.quantity;
    }, 0);
    const moviesOnCart = myCart.map((el) => el.id);
    applyDiscount(moviesOnCart, discountRules);
    setTotalCart(discount !== 0 ? total - discount : total);
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
              <button onClick={() => addMovieToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {myCart.map((movie) => (
            <li className="movies__cart-card" key={movie.id}>
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
          <p>Total: ${totalCart}</p>
        </div>
      </div>
    </section>
  );
}
