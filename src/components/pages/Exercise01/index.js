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
  ]

  const [cart, setCart] = useState([])

  const getTotal = () => {
    let total = 0
    let discount = 0
    cart.forEach(movieCart => {
      total = total + (movieCart.quantity * movieCart.price) 
    })

    discountRules.forEach(value => {
      let aux = 0
      if(value.m.length === cart.length) {
        cart.forEach((movieCart, i) => {
          if(movieCart.quantity === value.m[i]) {
            aux = aux + 1
          }
        })
        if(aux === value.m.length) discount = value.discount
      }
    })

    discount = total * discount 
    return total - discount
  }

  const addToCart = (movie) => {
    const carts = [...cart];

    if(carts.findIndex(v => v.id === movie.id) === -1) {
      carts.push({...movie,quantity: 1})
    }else{
      carts.forEach((movieCart, i) => {
        if(movieCart.id === movie.id) {
          carts[i] = {
            ...movieCart,
            quantity: movieCart.quantity + 1
          }
        }
      })
    }
  
    setCart(carts)
  }

  const incrementQuantity = movie => {
    const carts = [...cart]
    const index = cart.findIndex(movieCart => movieCart.id === movie.id)
    if(index !== -1) {
      carts[index] = {
        ...movie,
        quantity: movie.quantity + 1
      }
      setCart(carts)
    }
  }

  const decrementQuantity = movie => {
    const carts = [...cart]
    const index = cart.findIndex(movieCart => movieCart.id === movie.id)
    if(index !== -1) {
      const quantity = movie.quantity -1
      if(quantity === 0) {
        const list = carts.filter(value => value.id !== movie.id)
        setCart(list)
      } else {
        carts[index] = {
          ...movie,
          quantity
        }
        setCart(carts)
      }
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card">
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
          {cart.map(x => (
            <li className="movies__cart-card">
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
                <button onClick={() => decrementQuantity(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => incrementQuantity(x)}>
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