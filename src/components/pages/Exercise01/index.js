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
    { id: 1, name: 'Star Wars', price: 20 },
    { id: 2, name: 'Minions', price: 25 },
    { id: 3, name: 'Fast and Furious', price: 10 },
    { id: 4, name: 'The Lord of the Rings', price: 5 }
  ]

  const discountRules = [
    { m: [3, 2], discount: 0.25 },
    { m: [2, 4, 1], discount: 0.5 },
    { m: [4, 2], discount: 0.1 }
  ]

  const [cart, setCart] = useState([])

  const addToCart = (movie) => {
    setCart(prevCart => {
      const existingMovie = prevCart.find(item => item.id === movie.id)
      if (existingMovie) {
        return prevCart.map(item =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...movie, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (movie, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.id === movie.id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    })
  }

  const distributeMovies = (cart, discountRules) => {
    let normalPrice = [];
    let discountPrice = [];
    let cartCopy = JSON.parse(JSON.stringify(cart));

    discountRules.sort((a, b) => b.m.length - a.m.length);

    discountRules.forEach(rule => {
      let ruleSet = new Set(rule.m);
      let ruleMovies = [];
      
      cartCopy.forEach(item => {
        if (ruleSet.has(item.id) && item.quantity > 0) {
          ruleMovies.push(item);
        }
      });

      while (ruleMovies.length === rule.m.length) {
        discountPrice.push(ruleMovies.map(movie => ({ ...movie, quantity: 1 })));
        ruleMovies.forEach(movie => {
          const cartItem = cartCopy.find(item => item.id === movie.id);
          if (cartItem) cartItem.quantity -= 1;
        });
        ruleMovies = ruleMovies.filter(movie => movie.quantity > 0);
      }
    });

    cartCopy.forEach(item => {
      while (item.quantity > 0) {
        normalPrice.push({ ...item, quantity: 1 });
        item.quantity -= 1;
      }
    });

    return { normalPrice, discountPrice };
  }

  const getTotal = () => {
    const { normalPrice, discountPrice } = distributeMovies(cart, discountRules);

    const normalTotal = normalPrice.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discountTotal = discountPrice.reduce((sum, discountSet) => {
      const setTotal = discountSet.reduce((setSum, item) => setSum + item.price * item.quantity, 0);
      const discountRule = discountRules.find(rule => rule.m.every(id => discountSet.some(item => item.id === id)));
      return sum + setTotal * (1 - discountRule.discount);
    }, 0);

    return (normalTotal + discountTotal).toFixed(2);
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={o.id} className="movies__list-card">
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li key={x.id} className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => updateQuantity(x, -1)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => updateQuantity(x, 1)}>+</button>
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
