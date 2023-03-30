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
import { useCallback, useEffect, useMemo, useState } from 'react'

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

  const discountRules = useMemo(() => [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ], [])

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)

  const calculateDiscount = useCallback((cart) => {
    const discountRulesMatched = discountRules.filter(rule => {
      const moviesInCart = cart.map(movie => movie.id)
      return rule.m.every(movieId => moviesInCart.includes(movieId))
    })

    const discount = discountRulesMatched.reduce((acc, rule) => {
      return rule.discount > acc ? rule.discount : acc
    }, 0)

    return discount >= 1 ? 0 : discount
  }, [discountRules])

  useEffect(() => {
    const discount = calculateDiscount(cart)
    const subTotal = cart.reduce((acc, movie) => {
      return acc + (movie.price * movie.quantity)
    }, 0)
    setSubTotal(subTotal)
    setTotal(parseInt(subTotal - (subTotal * discount)))
    setDiscount(discount)
  }, [cart, calculateDiscount])

  const handleAddMovieToCart = (movie) => {
    const movieInCart = cart.find(cartMovie => cartMovie.id === movie.id)
    if (movieInCart) {
      movieInCart.quantity++
      setCart([...cart])
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  const handleRemoveMovieFromCart = (movie) => {
    const movieInCart = cart.find(cartMovie => cartMovie.id === movie.id)
    if (movieInCart) {
      movieInCart.quantity--
      if (movieInCart.quantity === 0) {
        setCart(cart.filter(cartMovie => cartMovie.id !== movie.id))
      } else {
        setCart([...cart])
      }
    }
  }

  const handleRemoveItemFromCart = (movie) => {
    setCart(cart.filter(cartMovie => cartMovie.id !== movie.id))
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
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
              <button onClick={() => handleAddMovieToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
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
                <button onClick={() => handleRemoveMovieFromCart(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleAddMovieToCart(x)}>
                  +
                </button>
              </div>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleRemoveItemFromCart(x)}>
                  Remove Item
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          {cart.length === 0 && (
            <p>Cart is empty</p>
          )}
          {cart.length > 0 && (
            <>
              <p>Subtotal: ${subTotal}</p>
              <p>Discount: {discount * 100}%</p>
              <p>Total: ${total}</p>
              <button onClick={() => setCart([])}>
                Clean Cart
              </button>
            </>
          )}

        </div>
      </div>
    </section>
  )
}
