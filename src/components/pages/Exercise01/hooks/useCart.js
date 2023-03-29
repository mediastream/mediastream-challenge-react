import { useCallback, useEffect, useState } from "react";
import { initialCart, discountRules } from "../constants";

export const useCart = () => {
  const [cart, setCart] = useState([initialCart]);
  const [cartData, setCartData] = useState({
    subTotal: 0,
    total: 0,
    discounts: 0,
  });

  const getMovie = (movie, newCart) => newCart.find((m) => m.id === movie.id);

  const addToCart = (movie) => {
    // copy of the current cart
    let newCart = [...cart];
    // find movie on the current cart
    const previousMovie = getMovie(movie, newCart);
    if (previousMovie) {
      previousMovie.quantity++;
    } else {
      // add to new cart the movie with default quantity
      newCart = [...newCart, { ...movie, quantity: 1 }];
    }
    setCart(newCart);
  };

  const onIncrement = (movie) => {
    addToCart(movie);
  };

  const getSubTotal = useCallback(() => {
    return cart.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );
  }, [cart]);

  const onDecrement = (movie) => {
    // copy of the current cart
    let newCart = [...cart];
    const previousMovie = getMovie(movie, newCart);
    previousMovie.quantity--;
    // remove movie with quantity less than 1
    newCart = newCart.filter((m) => m.quantity > 0);
    setCart(newCart);
  };

  const getDiscountRate = useCallback(() => {
    const moviesId = cart.map((m) => m.id);
    let maxDiscount = 0;
    discountRules.forEach((rules) => {
      const isDiscount = rules.m.every((item) => moviesId.includes(item));
      if (isDiscount) {
        maxDiscount =
          rules.discount > maxDiscount ? rules.discount : maxDiscount;
      }
    });
    return maxDiscount;
  }, [cart]);

  useEffect(() => {
    const subTotal = getSubTotal();
    const discountRate = getDiscountRate();
    const discounts = subTotal * discountRate;

    setCartData({
      subTotal: getSubTotal(),
      discounts: discounts,
      total: subTotal - discounts,
    });
  }, [cart, getDiscountRate, getSubTotal]);

  return { cart, onDecrement, onIncrement, addToCart, cartData };
};
