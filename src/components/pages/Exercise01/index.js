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
import { getMoviesTotal } from '../../../utils'
import { DISCOUNT_RULES, MOVIES } from '../../../data'

export default function Exercise01() {

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const addToCart = (item) => {
    const ids = cart.map((element) => element.id)
    if (ids.includes(item.id) === false) {
      setCart((prevState) => {
        const newItem = {
          ...item,
          quantity: 1
        }
        return [
          ...prevState,
          newItem
        ]
      })
    }
  }

  const quantityButton = (movie, value) => {
    setCart((prevState) => {
      const newState = prevState.map((element) => {
        if (element.id === movie.id && element.quantity + value !== 0) {
          return {
            ...element,
            quantity: element.quantity + value
          }
        } else if (element.id === movie.id && element.quantity + value === 0) {
          return null
        }
        else {
          return element
        }
      }).filter((element) => element !== null)
      return [...newState]
    })
  }

  const getTotal = () => {
    const ids = cart.map((element) => element.id)
    switch (true) {
      case DISCOUNT_RULES[1].m.every((element) => ids.includes(element)):
        return getMoviesTotal(cart, DISCOUNT_RULES[1].discount)
      case DISCOUNT_RULES[0].m.every((element) => ids.includes(element)):
        return getMoviesTotal(cart, DISCOUNT_RULES[0].discount)
      case DISCOUNT_RULES[2].m.every((element) => ids.includes(element)):
        return getMoviesTotal(cart, DISCOUNT_RULES[2].discount)
      default:
        return cart.reduce(function (accumulator, curValue) {
          return accumulator + (curValue.price * curValue.quantity)
        }, 0)
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {MOVIES.map((o, index) => (
            <li className="movies__list-card" key={index}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, index) => (
            <li className="movies__cart-card" key={index}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => quantityButton(x, -1)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => quantityButton(x, 1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
} 