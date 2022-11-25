/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart √
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart √
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150 √
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */
import './assets/styles.css';
import { movies } from './assets/data';
import { useCart } from './hooks/useCart';

export default function Exercise01() {
  const { cart, addToCart, decrementItem, getTotal } = useCart();
  const totalResult = getTotal();

  return (
    <section className='exercise01'>
      <div className='movies__list'>
        <ul>
          {movies.map((movie) => (
            <li className='movies__list-card' key={movie.id}>
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

      {!!cart.length && (
        <div className='movies__cart'>
          <ul>
            {cart.map((item) => (
              <li className='movies__cart-card' key={`item_${item.id}`}>
                <ul>
                  <li>ID: {item.id}</li>
                  <li>Name: {item.name}</li>
                  <li>Price: ${item.price}</li>
                </ul>
                <div className='movies__cart-card-quantity'>
                  <button onClick={() => decrementItem(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>

          {totalResult.discount > 0 && (
            <div className='movies__cart-discount'>
              <p>Discount: ${totalResult.discount}</p>
            </div>
          )}
          <div className='movies__cart-total'>
            <p>Total: ${totalResult.total}</p>
          </div>
        </div>
      )}
    </section>
  );
}
