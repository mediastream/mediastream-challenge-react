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
import MovieCart from "./components/MovieCard";

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 2,
    },
  ]);

  const setMovieToCart = (movie) => {
    const auxMovie = cart.find((e) => e.id === movie.id);
    if (!auxMovie) {
      movie.quantity = 1;
      setCart([...cart, movie]);
    } else {
      alert("The movie is already in the cart");
    }
  };

  const incrementQuantity = (movie) => {
    const auxCart = cart.map((movieCart) => {
      if (movieCart.id === movie.id) movieCart.quantity = movieCart.quantity + 1;
      return movieCart;
    });
    setCart(auxCart);
  };

  const decrementQuantity = (movie) => {
    const auxCart = cart.filter((movieCart) => {
      if (movieCart.id === movie.id) {
        movieCart.quantity = movieCart.quantity - 1;
      }
      if (movieCart.quantity > 0) {
        return movieCart;
      }
    });
    setCart(auxCart);
  };

  const getTotal = () => {
    let total = cart.reduce((acc, e) => acc + e.quantity * e.price, 0);
    for (const discount of discountRules) {
      if (discount.m.length === cart.length) {
        if (!discount.m.some((val, i) => val !== cart[i].id)) {
          total -= total * discount.discount;
        }
      }
    }
    return total;
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <MovieCart movie={o} setMovieToCart={() => setMovieToCart(o)} />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <MovieCart
              movie={x}
              decrement={() => decrementQuantity(x)}
              increment={() => incrementQuantity(x)}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  );
}
