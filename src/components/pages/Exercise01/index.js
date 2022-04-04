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

import { useReducer, useState, useEffect } from 'react';
import './assets/styles.css'
import { Movies } from './components/Movies';
import { CartMovies } from './components/CartMovies';
import { cartReducer } from '../../../reducers/cartReducer';

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

  const [total, setTotal] = useState(0);

  const cart = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ]

  const [cartMovies, dispatch] = useReducer(cartReducer, cart);

  const getTotal = () => {
    const sum = cartMovies.reduce((total, value) => total + (value.price * value.quantity), 0);
    
    const idsMovies = cartMovies.map(({ id }) => id);
    
    const idsDiscount = discountRules.map( ({m, discount}) => getDiscount(m, idsMovies, discount) );

    const discount = idsDiscount.find( value  => value > 0 ) || 0;

    setTotal(sum -  (sum * discount));
  }

  const getDiscount =  (discounts, ids, discount) => {

    let sortedDiscounts = [ ...discounts ].sort();
    let sortedIds = [ ...ids ].sort();

    const valueDiscount = (sortedDiscounts.length === sortedIds.length && 
      sortedDiscounts.every((element, index) => element === sortedIds[index])) 
    ? discount 
    : 0

    return valueDiscount
  }

  useEffect(() => {
    getTotal();

  }, [cartMovies])


  const handleAddCart = (newMovie) => {
    dispatch({
      type: 'addCart',
      payload: newMovie
    });
  }

  const handleIncrement = (id) => {
    dispatch({
      type: 'increment',
      payload: id
    })
  }

  const handleDecrement = (id) => {
    dispatch({
      type: 'decrement',
      payload: id
    })
  }

  const handleDelete = (id) => {
    dispatch({
      type: 'delete',
      payload: id
    })
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <Movies
              key={movie.id}
              movie={movie}
              handleAddCart={handleAddCart}
            />
          ))}
        </ul>
      </div>
      {(cartMovies.length > 0) &&
        <div className="movies__cart">
          <ul>
            {cartMovies.map(x => (
              <CartMovies
                key={x.id}
                x={x}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
          <div className="movies__cart-total">
            <p>Total: ${total}</p>
          </div>
        </div>
      }
    </section>
  )
} 