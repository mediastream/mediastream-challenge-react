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
import MoviesCart from '../../MoviesCart';
import MoviesList from '../../MoviesList';
import useExercise01 from './useExercise01';

export default function Exercise01() {
  const {
    cart,
    movies,
    handleIncrementQty,
    handleDecrementQty,
    handleAddToCart,
    getTotal,
  } = useExercise01();

  return (
    <section className="exercise01">
      <MoviesList
        movies={movies}
        onAddToCart={handleAddToCart}
      />
      <MoviesCart
        cart={cart}
        onIncrement={handleIncrementQty}
        onDecrement={handleDecrementQty}
        getTotal={getTotal}
      />
    </section>
  )
} 