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
 * You have to apply all discounts in the rules array (discountRules). --DONE
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { movieList } from "./data/movieList";
import useMyCart from "./hooks/useMyCart";

export default function Exercise01() {
  const {
    myCart,
    totalCart,
    addMovieToCart,
    incrementMovieQuantity,
    decreaseMovieQuantity,
  } = useMyCart();

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movieList.map((movie) => (
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
          {myCart.length === 0 && <h1>Cart empty</h1>}
          <hr />
          <p>Total: ${totalCart}</p>
        </div>
      </div>
    </section>
  );
}
