/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart [done]
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart [done]
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150 [done]
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.[done]
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState, createContext, useContext } from 'react'

const Context = createContext()

const SingleMovie = (props) => {
  const { movieInfo } = props
  const { setCart, cart } = useContext(Context)
  const handleAddToCart = () => {

    const cartIdExist = () => {
      let exist = false
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.id === movieInfo.id) {
          exist = true
          break
        }
      }
      return exist
    }
    if (cartIdExist()) {
      return
    }
    movieInfo.quantity = 1
    const cartCopy = [...cart]
    cartCopy.push(movieInfo)
    setCart(cartCopy)
  }
  return (
    <li className="movies__list-card">
      <ul>
        <li>
          ID: {movieInfo.id}
        </li>
        <li>
          Name: {movieInfo.name}
        </li>
        <li>
          Price: ${movieInfo.price}
        </li>
      </ul>
      <button onClick={handleAddToCart}>
        Add to cart
      </button>
    </li>
  )
}

const SingleCartItem = ({ cartItem }) => {
  const { cart, setCart } = useContext(Context)
  const handleCount = (increment) => {
    const cartCopy = [...cart]
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.id === cartItem.id) {
        if (increment) {
          item.quantity++
        } else {
          item.quantity--
        }
        if (item.quantity === 0) {
          cartCopy.splice(i, 1)
        }
        break
      }
    }
    setCart(cartCopy)
  }
  return <li className="movies__cart-card">
    <ul>
      <li>
        ID: {cartItem.id}
      </li>
      <li>
        Name: {cartItem.name}
      </li>
      <li>
        Price: ${cartItem.price}
      </li>
    </ul>
    <div className="movies__cart-card-quantity">
      <button onClick={() => handleCount(false)}>
        -
      </button>
      <span>
        {cartItem.quantity}
      </span>
      <button onClick={() => handleCount(true)}>
        +
      </button>
    </div>
  </li>
}

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
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      total += cartItem.price * cartItem.quantity
    }

    const checkForDiscount = () => {
      for (let i = 0; i < discountRules.length; i++) {
        const rule = discountRules[i];
        if (rule.m.length !== cart.length) continue
        const ruleMatch = rule.m.every((id) => {
          return cart.some((cartItem) => {
            return cartItem.id === id
          })
        })
        if (ruleMatch) {
          return rule.discount
        }
      }
    }
    const discount = checkForDiscount()
    return { total, discount }
  }

  const { total, discount } = getTotal()
  return (
    <Context.Provider value={{ cart, setCart }}>
      <section className="exercise01">
        <div className="movies__list">
          <ul>
            {movies.map((o, idx) => {
              return (<SingleMovie movieInfo={o} key={idx} />)
            })}
          </ul>
        </div>
        <div className="movies__cart">
          <ul>
            {cart.length === 0 && <p>Cart is empty add at least one item</p>}
            {cart.map((cartItem, idx) => (
              <SingleCartItem cartItem={cartItem} key={idx} />
            ))}
          </ul>
          <div className="movies__cart-total">
            <p>Total: {discount && <>From ${total} to </>}${(total && discount) ? (total - (total * (discount / 100))) : total} {discount && <>With a discount of {discount * 100}% applied</>}</p>
          </div>
        </div>
      </section>
    </Context.Provider>
  )
}