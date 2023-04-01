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

import './assets/styles.css'
import { useCart } from "./hooks/useCart";
import { movies } from "./const/movies";

export default function Exercise01() {
  const { cart, subtotal, discount, addToCart, removeOfCart } = useCart();

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((mov) => (
            <li className="movies__list-card" key={mov.id + mov.name}>
              <ul>
                <li>ID: {mov.id}</li>
                <li>Name: {mov.name}</li>
                <li>Price: ${mov.price}</li>
              </ul>
              <button onClick={() => addToCart(mov)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((article) => (
            <li className="movies__cart-card" key={article.id + article.name}>
              <ul>
                <li>ID: {article.id}</li>
                <li>Name: {article.name}</li>
                <li>Price: ${article.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => removeOfCart(article.id)}>-</button>
                <span>{article.quantity}</span>
                <button onClick={() => addToCart(article)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          {discount > 0 && (
            <>
              <p>Subtotal: ${subtotal}</p>
              <p>Descuento: -{discount * 100}%</p>
            </>
          )}
          <p>Total: ${subtotal - subtotal * discount}</p>
        </div>
      </div>
    </section>
  );
} 