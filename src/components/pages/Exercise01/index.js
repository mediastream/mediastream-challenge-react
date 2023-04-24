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

import './assets/styles.css';
import useExercise01 from './useExercise01';
import { moneyFormat, percentageFormat } from './utils';

let rendered = 0;

export default function Exercise01() {
  // --- Hooks --- //
  const [{ cart, total, subtotal, discount, movies, objCart }, actions] =
    useExercise01();

  // --- Render --- //
  console.count('Render Exercise01');
  rendered += 1;

  return (
    <>
      <section className='exercise01'>
        <div className='movies__list'>
          <ul>
            {movies.map((o) => (
              <li className='movies__list-card'>
                <ul>
                  <li>ID: {o.id}</li>
                  <li>Name: {o.name}</li>
                  <li>Price: ${o.price}</li>
                </ul>
                <button onClick={() => actions.handleIncrement(o.id)}>
                  {objCart[o.id] ? 'Add another one to cart' : 'Add to cart'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='movies__cart'>
          <ul>
            {cart.map((x) => (
              <li className='movies__cart-card'>
                <ul>
                  <li>ID: {x.id}</li>
                  <li>Name: {x.name}</li>
                  <li>Price: ${x.price}</li>
                </ul>
                <div className='movies__cart-card-quantity'>
                  <button onClick={() => actions.handleDecrement(x.id)}>
                    -
                  </button>
                  <span>{x.quantity}</span>
                  <button onClick={() => actions.handleIncrement(x.id)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className='movies__cart-total'>
            <p>Subtotal: {moneyFormat(subtotal)}</p>
            <p>Discount: {percentageFormat(discount)}</p>
            <p>Total: {moneyFormat(total)}</p>
          </div>
          <p className='rendered-count'>Rendered {rendered} times</p>
        </div>
      </section>
    </>
  );
}
