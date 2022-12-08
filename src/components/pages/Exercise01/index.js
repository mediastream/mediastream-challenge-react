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

/* Parameters vars like discountRules or movies I prefer to put
outside of the component to keep the code mode legible.
*/


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


export default function Exercise01 () {

  /* Cart Modification: Instead to be an array, Cart will be an object where keys
     will be the id of the movie and the value the movie. That makes more easy the
     adding or deletion of a movie to the cart.
  */
  const [cart, setCart] = useState({
    1: {
        id: 1,
        name: 'Star Wars',
        price: 20,
        quantity: 2
        }
    })

  const addToCart = (newMovie) => {
      const movieId = newMovie.id

    if (cart[movieId] === undefined) {
        setCart({...cart,
                 [movieId]: {...newMovie,
                                quantity: 1
                            }
                })
    } else {
        setCart({...cart,
                 [movieId]: {...newMovie,
                           quantity: cart[movieId].quantity + 1
                          }
                })
    }
  }

  const decreaseQuantity = (movie) => {
    const movieId = movie.id
    // First case: Movie only reduces quantity
    if (cart[movieId].quantity > 1) {
        setCart({...cart,
                 [movieId]: {
                    ...movie,
                    quantity: cart[movieId] - 1
                            }
                })
    } else {
        // Second case: Movie removed from cart
        const {[movieId]: _, ...newCart} = cart
        setCart(newCart)

    }

  }

  const getTotal = () => 0 // TODO: Implement this

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, i) => (
            <li key={i} className="movies__list-card">
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
          {Object.values(cart).map((x, i) => (
            <li key={i} className="movies__cart-card">
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
                <button onClick={() => decreaseQuantity(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => addToCart(x)}>
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