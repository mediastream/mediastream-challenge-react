import { useState } from 'react'
import { movies, discountRules } from './db';

export default function useExercise01() {
  const [cart, setCart] = useState([]);

  function getTotal() {
    return 0;
  }

  function handleDecrementQty(id) {
    setCart((prevState) => {
      let removeIndex;
      const newCart = prevState.map((movieCart, index) => {
        if (movieCart.id === id) {
          if (movieCart.quantity > 1) {
            return { ...movieCart, quantity: movieCart.quantity - 1 }
          } else {
            removeIndex = index;
            return {};
          }
        }
        return movieCart;
      });

      if (removeIndex !== undefined) {
        newCart.splice(removeIndex, 1);
      }

      return newCart;
    });
  }

  function handleIncrementQty(id) {
    setCart((prevState) =>
      prevState.map((movieCart) => (
        movieCart.id === id
          ? { ...movieCart, quantity: movieCart.quantity + 1 }
          : movieCart))
    );
  }

  function handleAddToCart(movie) {
    const movieAlreadyInCart = cart.find((movieCart) => movieCart.id === movie.id);

    if (movieAlreadyInCart) {
      return;
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...movie,
        quantity: 1
      },
    ]);
  }

  return {
    cart,
    movies,
    getTotal,
    handleIncrementQty,
    handleDecrementQty,
    handleAddToCart,
  }
}
