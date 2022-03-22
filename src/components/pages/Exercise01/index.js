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

import { useState } from 'react'

import MovieList from './MovieList/'
import Cart from './Cart/'
import { addProductToCart, decrementItemOnCart, getTotal, incrementItemOnCart } from './useCases/cart'
import './assets/styles.css'

export default function Exercise01 () {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const saveOnCart = (movie) => {
    const updatedCart = addProductToCart(cart, movie)
    setCart(updatedCart)
  }

  const saveOnCartDecrement = (movie) => {
    const updatedCart = decrementItemOnCart(cart, movie)
    setCart(updatedCart)
  }

  const saveOnCartIncrement = (movie) => {
    const updatedCart = incrementItemOnCart(cart, movie)
    setCart(updatedCart)
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <MovieList saveOnCart={saveOnCart} />
      </div>
      <div className="movies__cart">
        <Cart
          cart={cart}
          decrementItem={saveOnCartDecrement}
          incrementItem={saveOnCartIncrement}
        />
        <div className="movies__cart-total">
          <p>Total: ${getTotal(cart)}</p>
        </div>
      </div>
    </section>
  )
} 