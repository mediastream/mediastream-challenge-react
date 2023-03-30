/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m:Â [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState } from "react";

export default function Exercise01() {
  const [cart, setCart] = useState([]);
  const movies = [
    {
      id: 1,
      title: "Star Wars",
      price: 20,
      image:
        "https://i.pinimg.com/736x/01/f0/be/01f0be4e4c185993e5fc749916d375f1.jpg",
    },
    {
      id: 2,
      title: "Minions",
      price: 25,
      image: "https://www.ecartelera.com/carteles/14500/14511/002_p.jpg",
    },
    {
      id: 3,
      title: "Fast and Furious",
      price: 10,
      image:
        "https://archivos-cms.cinecolombia.com/images/1/2/7/8/18721-5-esl-CO/FF9_DIGTAL_1_SHEET_MONTAGE_LAT-AM.jpg",
    },
    {
      id: 4,
      title: "The Lord of the Rings",
      price: 5,
      image: "https://www.ecartelera.com/carteles/2600/2650/001_m.jpg",
    },
    {
      id: 5,
      title: "Ghostbusters",
      price: 6,
      image: "https://www.ecartelera.com/carteles/4400/4441/001_m.jpg",
    },
  ];
  const discountRules = [
    { movies: [3, 2], discount: 0.25 },
    { movies: [2, 4, 1], discount: 0.5 },
    { movies: [4, 2], discount: 0.1 },
    { movies: [1, 4, 5], discount: 0.2 },
  ];

  const getMovieById = (id) => {
    return movies.find((movie) => movie.id === id);
  };

  const addMovieToCart = (id, quantity = 1) => {
    const movie = getMovieById(id);
    if (movie) {
      const cartItem = cart.find((item) => item.movie.id === id);
      if (cartItem) {
        cartItem.quantity += quantity;
        if (cartItem.quantity <= 0) {
          setCart(cart.filter((item) => item !== cartItem));
        } else {
          setCart([...cart]);
        }
      } else if (quantity > 0) {
        setCart([...cart, { movie, quantity }]);
      }
    }
  };

  const calculateTotalCost = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.movie.price * item.quantity,
      0
    );
    const discount = calculateDiscount();
    return total - discount;
  };

  const calculateDiscount = () => {
    let maxDiscount = 0;
    discountRules.forEach((rule) => {
      const hasAllMovies = rule.movies.every((movieId) =>
        cart.some((item) => item.movie.id === movieId)
      );
      if (hasAllMovies && rule.discount > maxDiscount) {
        maxDiscount = rule.discount;
      }
    });
    return cart.reduce(
      (acc, item) => acc + item.movie.price * item.quantity * maxDiscount,
      0
    );
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <div className="movies__list-header">
          <p>Movies Catalog</p>
        </div>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <div className="movies__list-card">
                <img
                  className="movie-poster"
                  src={movie.image}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <li>ID: {movie.id}</li>
                  <li>Name: {movie.title}</li>
                  <li>Price: ${movie.price}</li>
                  <button onClick={() => addMovieToCart(movie.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          <div className="movies__cart-header">
            <p>Movies Cart</p>
          </div>
          {cart.map((cartItem) => (
            <li key={cartItem.movie.id}>
              <div className="movies__cart-card">
                <img
                  className="movie-poster"
                  src={cartItem.movie.image}
                  alt={cartItem.movie.title}
                />
                <div className="movie-info">
                  <li>ID: {cartItem.movie.id}</li>
                  <li>Name: {cartItem.movie.title}</li>
                  <li>Price: ${cartItem.movie.price}</li>
                  <div className="movies__cart-card-quantity">
                    <button
                      onClick={() => addMovieToCart(cartItem.movie.id, -1)}
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => addMovieToCart(cartItem.movie.id)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${calculateTotalCost()}</p>
        </div>
      </div>
    </section>
  );
}
