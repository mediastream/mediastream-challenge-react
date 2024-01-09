import { useEffect, useMemo, useState } from 'react'
import { movies, discountRules } from './db';
import equalArray from '../../../utils/arrayEqual';

export default function useExercise01() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  const sortedDiscountRules = useMemo(() => {
    return discountRules.map((rule) => ({ ...rule, m: rule.m.sort() }));
  }, []);

  useEffect(() => {
    const moviesId = cart.map(({ id }) => id).sort();
    let discount = 0;
    sortedDiscountRules.forEach((rule) => {
      if (equalArray(rule.m, moviesId)) {
        discount = rule.discount;
      }
    });
    setDiscount(discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  function getTotal() {
    let total = 0;

    cart.forEach(({ price, quantity }) => {
      total += (price * quantity);
    })

    return total - (total * discount);
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