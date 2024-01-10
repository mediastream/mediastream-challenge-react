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
import { useCallback, useState } from 'react'

export default function Exercise01() {
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

  // const discountRules = [
  //   {
  //     m: [3, 2],
  //     discount: 0.25
  //   },
  //   {
  //     m: [2, 4, 1],
  //     discount: 0.5
  //   },
  //   {
  //     m: [4, 2],
  //     discount: 0.1
  //   }
  // ]

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const useTotal = useCallback(() => {
    let total = 0
    cart.forEach(item => {
      total += item.price * item.quantity
    })
    return total
  }, [cart])

  const addToCart = (movie) => {
    setCart(
      [...cart, {
        ...movie,
        quantity: 1
      }])
  }
  const removeFromCart = (movie) => {
    setCart(cart.filter((item) => item.id !== movie.id))
  }

  const incrementQuantity = (movie) => {
    setCart(cart.map((item) => item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item))
  }

  const decrementQuantity = (movie) => {
    if (movie.quantity === 1) return removeFromCart(movie)
    setCart(cart.map((item) => item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item))
  }


  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>
                  ID: {movie.id}
                </li>
                <li>
                  Name: {movie.name}
                </li>
                <li>
                  Price: ${movie.price}
                </li>
              </ul>
              <button onClick={() => addToCart(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((item, index) => (
            <li key={`${index}-${item.id}`} className="movies__cart-card">
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
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(item)}>
                  -
                </button>
                <span>
                  {item.quantity}
                </span>
                <button onClick={() => incrementQuantity(item)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${useTotal()}</p>
        </div>
      </div>
    </section>
  )
} 