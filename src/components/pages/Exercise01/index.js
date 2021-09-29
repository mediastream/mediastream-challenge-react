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
import { addItemToCart, removeItemFromCart } from '../../../utils/Cart/CartUtils'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      coincidence: [3,2],
      discount: 0.25
    },
    {
      coincidence: [2,4,1],
      discount: 0.5
    },
    {
      coincidence: [4,2],
      discount: 0.1
    } 
  ]

  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discount: 0
  });

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(item => (
            <li className="movies__list-card" key={item.id}>
              <ul>
                <li>
                  ID: {item.id}
                </li>
                <li>
                  Name: {item.name}
                </li>
                <li>
                  Price: ${item.price}
                </li>
              </ul>
              <button onClick={ () => addItemToCart( cart, setCart, discountRules, item ) }>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.items.map(cartItem => (
            <li className="movies__cart-card" key={cartItem.id}>
              <ul>
                <li>
                  ID: {cartItem.id}
                </li>
                <li>
                  Name: {cartItem.name}
                </li>
      g          <li>
                  Price: ${cartItem.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => removeItemFromCart( cart, setCart, discountRules, cartItem )}>
                  -
                </button>
                <span>
                  {cartItem.quantity}
                </span>
                <button onClick={() => addItemToCart( cart, setCart, discountRules, cartItem )}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <br/>
          <p>{ cart.discount > 0 ? `Total without discount: $${cart.total}` : '' }</p>
          <p>{ cart.discount > 0 ? `Discount applied: ${cart.discount*100}%` : '' }</p>
        </div>
        <div className="movies__cart-total">
          <p>Total ${cart.total - (cart.total * cart.discount)}</p>
        </div>
      </div>
    </section>
  )
} 