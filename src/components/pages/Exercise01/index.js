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
    return cart.reduce( (acc, movie) => {
      return acc + (movie.price * movie.quantity)
    }, 0);
  };

  // El descuento se agrega si existe alguna de las convinaciones presente en el carro
  // el enunciado esta algo anbiguo y lo entendi de esta manera
  // si existen combinaciones de descuentos en el carrito de compras, cada uno de estos descuentos se aplicaran!
  const getDiscount = () => {
    let totalDiscount = 0;
    discountRules.forEach( (rule, index) => {
      const hasMovieIncludedInTheRule = rule.m.every( m => cart.some( movie => movie.id === m));
      if (hasMovieIncludedInTheRule) {
        totalDiscount += rule.discount;
      }
    });

    return getTotal() * totalDiscount;
  }

  const handleClickAddCard = (movie) => {
    setCart([...cart, {...movie, quantity: 1}]);
  }

  const handleClickIncreaseMovieCopy = (movie, movieIndexInCart) => {
    const quantityCopy = movie.quantity + 1;
    setQuantityMovieCopy(quantityCopy, movieIndexInCart);
  }

  const handleClickDecreaseMovieCopy = (movie, movieIndexInCart) => {
    const quantityCopy = movie.quantity - 1;

    if (quantityCopy <= 0) {
      setCart(cart.filter( (movie, index) => index !== movieIndexInCart))
      return;
    }
    setQuantityMovieCopy(quantityCopy, movieIndexInCart);
  }

  const setQuantityMovieCopy = (quantityCopy, movieIndexInCart) => {
    const newCart = cart.map( (movie, index) => {
      if (movieIndexInCart === index) {
        return {
          ...movie,
          quantity: quantityCopy
        }
      }
      return movie;
    })
    setCart(newCart);
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map( o => (
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
              <button onClick={ () => handleClickAddCard(o) } disabled={cart.some( movie => movie.id === o.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map( (x, index) => (
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
                <button onClick={() => handleClickDecreaseMovieCopy(x, index)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleClickIncreaseMovieCopy(x, index)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>SubTotal: ${getTotal()}</p>
          <p>Descuentos: ${getDiscount()}</p>
          <p>Total: ${getTotal() - getDiscount()}</p>
        </div>
      </div>
    </section>
  )
} 