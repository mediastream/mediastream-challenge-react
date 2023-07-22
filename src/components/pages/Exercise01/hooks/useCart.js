import { useState } from 'react'

import { discountRules } from '../utils/discountRules';

export const useCart = () => {
    const [cart, setCart] = useState([
        {
          id: 1,
          name: 'Star Wars',
          price: 20,
          quantity: 2
        }
    ]);

    const decrement = ({ id }) => {
      const checkMovieQuantity = cart.find((movie) => movie.id === id && movie.quantity === 1);

      if(checkMovieQuantity) {
        const confirmRemove = window.confirm('Are you sure? This action will remove the movie!');

        if(confirmRemove) {
            const removeMovie = cart.filter((movie) => movie.id !== id);

            return setCart(removeMovie);
        };

        return;
      }

      const movies = cart.map((movie) => {
        if(movie.id === id) {
          return {
            ...movie,
            quantity: movie.quantity - 1
          }
        }

        return movie;
      });

      setCart(movies);
    }

    const increment = ({ id }) => {
      const movies = cart.map((movie) => {
        if(movie.id === id) {
          return {
            ...movie,
            quantity: movie.quantity + 1
          }
        }

        return movie;
      });

      setCart(movies);
    }

    const addMovieToCart = ({ movie }) => {
      const movieExist = cart.find(({ id }) => movie.id === id);

      if (movieExist) {
        return window.alert('Movie has already been added!');
      }

      setCart([...cart, { ...movie, quantity: 1 }]);
    }

    const getTotal = () => {
      const totalPrice = cart.reduce((total, { price, quantity }) => {
        return total + price * quantity
      }, 0)

      const moviesId = cart.map((movie) => movie.id).sort();
      const getDiscount = discountRules.find(({ m: rules }) => JSON.stringify(rules.sort()) === JSON.stringify(moviesId))?.discount

      const calculatePrice = totalPrice - (getDiscount * totalPrice);

      if(getDiscount) {
        return calculatePrice.toFixed(2)
      }

      return totalPrice;
    }
    
    return {
      cart,
      totalPrice: getTotal(),
      addMovieToCart,
      increment,
      decrement
    }
}