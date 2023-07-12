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
import { useEffect, useState } from 'react'

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => {

    let total = 0
    cart.forEach(item => total += item.price * item.quantity)

    let moviesOnCart = []
    cart.forEach(item => moviesOnCart.push(item.id))

    let discount = 1

    if (discountRules[1].m.every(item => moviesOnCart.includes(item))) {

      discount = 0.5
      return total -= total * discount

    } else if (discountRules[0].m.every(item => moviesOnCart.includes(item))) {

      discount = 0.1
      return total -= total * discount

    } else if (discountRules[2].m.every(item => moviesOnCart.includes(item))) {

      discount = 0.25
      return total -= total * discount

    }

    return total

  } // TODO: Implement this

  /* Remove movie feature*/

  const removeMovie = ( id ) => {

    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)

  }

  /* Increment movie function */
  const changeQuantity = (id, increment, quantity) => {

    setCart(oldCart => {

      const newCart = oldCart.map(item => {

        if (item.id === id) {

          switch (increment) {
            case true:

              return { ...item, quantity: item.quantity + 1 }
              break;

            case false:

              return { ...item, quantity: item.quantity - 1 }
              break;

            default:
              break;
          }

        }

        return item;

      });

      const updateCart = newCart.filter(item => item.quantity !== 0)

      return updateCart;


    });

  }

  /* Add movie to cart feature */
  const addMovieToCart = (id) => {

    const newMovie = movies.find(item => item.id === id)

    if (cart.find(item => item.id === id)) {

      changeQuantity(id, true)

    } else {

      setCart([...cart, { ...newMovie, quantity: 1 }])

    }

  }


  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" >
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
              <button onClick={() => addMovieToCart(o.id)}>
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
                  <button onClick={() => changeQuantity(x.id, false, x.quantity)}>
                    -
                  </button>
                  <span>
                    {x.quantity}
                  </span>
                  <button onClick={() => changeQuantity(x.id, true)}>
                    +
                  </button>
                  <button className='delete__button' onClick={() => removeMovie(x.id)}>Delete</button>
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