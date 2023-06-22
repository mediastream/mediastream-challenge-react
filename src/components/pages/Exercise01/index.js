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
import { useState } from 'react'
import movies from './constants/movies.json'
import discountRules from './constants/discount-rules.json'
import MovieCard from "./components/movie-card";

const calculateAmount = (amount, increment) => {
  if(amount + increment < 0) return 0

  return amount + increment
}

export default function Exercise01 () {

  const [cart, setCart] = useState([])

  const addToCart = id => {
    const verify = cart.find(movie => movie.id === id)

    if (!verify) {
      setCart([
          ...cart,
          {
            ...movies.find(movie => movie.id === id),
            amount: 1
          }
      ])
    }
  }

  const updateAmount = (id, increment) => {
    setCart([
      ...cart.map(
          movie => movie.id === id ? {
            ...movie,
            amount: calculateAmount(movie.amount, increment)
          } : movie
      ).filter(movie => movie.amount > 0)
    ])
  }

    const getTotal = () => {
      const total = cart.reduce((total, movie) => total + (movie.amount * movie.price), 0)

      let totalDiscount = 0

      discountRules.map(discount => {
        const applyDiscount = discount.m.every(id => cart.some(movie => movie.id === id));
        if (applyDiscount) totalDiscount += discount.discount;
      })

      return total - (total * totalDiscount)
    }

  return (
    <section className="exercise01">
      <div className="movies__list">
        {
          movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToCart={addToCart}
              />
          ))
        }
      </div>
      <div className="movies__cart">
        {
          cart.map(movie => (
              <MovieCard
                  key={movie.id}
                  movie={movie}
                  isInCart={true}
                  updateAmount={updateAmount}
              />
          ))
        }
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}