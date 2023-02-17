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
import MovieCard from './components/MovieCard/MovieCard'
import MovieList from './components/MovieList/MovieList'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      synopsis: 'The Galactic War: A group of rebels band together to steal the plans for a powerful weapon being developed by the evil Empire.',
      cover: 'https://api.time.com/wp-content/uploads/2015/11/1101970210_400.jpg'
    },
    {
      id: 2,
      name: 'Minions',
      price: 25,
      synopsis: 'The story of the lovable, yellow creatures known as the Minions as they search for a new villainous master to serve.',
      cover: 'https://dx35vtwkllhj9.cloudfront.net/universalstudios/minions-the-rise-of-gru/images/regions/us/onesheet.jpg'
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10,
      synopsis: 'A group of street racers and criminals team up to pull off a series of high-stakes heists while trying to evade the law.',
      cover: 'https://i.ebayimg.com/images/g/v7AAAOSwstxVCESm/s-l1600.jpg'
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5,
      synopsis: 'A fantasy epic about a hobbit named Frodo Baggins, who embarks on a perilous journey to destroy an evil ring that has the power to enslave the world.',
      cover: 'https://m.media-amazon.com/images/I/81EBp0vOZZL.jpg'
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

  // initial state
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])
  
  // shopping cart logic
  const getTotal = () => {
    const subtotal = cart.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    return subtotal - getDiscount(subtotal);
  };
  

  const addToCart = (movie) => {
    const index = cart.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart[index].quantity++;
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...movie, quantity: 1 }];
      setCart(newCart);
    }
  };

  const incrementQuantity = (movie) => {
    const index = cart.findIndex((m) => m.id === movie.id);
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  };
  
  const decrementQuantity = (movie) => {
    const index = cart.findIndex((m) => m.id === movie.id);
    const newCart = [...cart];
    newCart[index].quantity--;
    if (newCart[index].quantity === 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const getDiscount = (subtotal) => {
    let totalDiscount = 0;
    for (const { m, discount } of discountRules) {
      if (cart.length === m.length && m.every(movieId => cart.some(item => item.id === movieId))) {
        totalDiscount += discount;
      }
    }
    return subtotal * totalDiscount;
  };


  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <MovieCard movie={o} key={o.name}>
               <button className={'movies__add-cart-button'} onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </MovieCard>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.length ? cart.map(x => (
             <MovieList 
                movie={x}
                key={x.name}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity} 
              />
          )) : <p>The cart is empty</p>}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
} 