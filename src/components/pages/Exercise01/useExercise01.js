import { useState } from 'react';
import { discountRules, movies } from './utils';

const useExercise01 = () => {
  // --- States --- //

  const [objCart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const cart = Object.values(objCart);

  // --- Functions --- //

  /**
   *
   * @param {*} cart
   * @returns total of the cart with discount
   */
  const getTotal = (objCart) => {
    return Object.values(objCart).reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  };

  /**
   *
   * @param {*} items
   * @param {*} key
   * @returns items grouped by key or by itself
   */
  const groupBy = (items, key) =>
    items.reduce(
      (acc, curr) => ({ ...acc, [key ? curr[key] : curr]: curr }),
      {}
    );

  /**
   *
   * @param {*} objCart
   * @returns new discount
   */
  const getDiscount = (objCart) => {
    const objCartIds = groupBy(Object.keys(objCart));

    const discounts = discountRules.filter(({ m }) => {
      return m.every((id) => !!objCartIds[id]);
    });

    return discounts.reduce((acc, curr) => acc + curr.discount, 0);
  };

  /**
   * update the cart, subtotal, discount and total
   * @param {*} newObjCart
   */
  const handleSummary = (newObjCart) => {
    const newDiscount = getDiscount(newObjCart);
    const subtotal = getTotal(newObjCart);
    const totalWithDiscount = subtotal - (subtotal * newDiscount);

    setCart(newObjCart);
    setSubtotal(subtotal);
    setDiscount(newDiscount);
    setTotal(totalWithDiscount);
  };

  /**
   *  Increment the quantity of a movie in the cart or add it if it doesn't exist and update the total
   * @param {*} movieId
   */
  const handleIncrement = (movieId) => {
    const movie = {
      ...(objCart[movieId] ?? movies.find(({ id }) => id === movieId)),
    };

    if (movie.quantity) {
      movie.quantity += 1;
    } else {
      movie.quantity = 1;
    }

    const newObjCart = {
      ...objCart,
      [movieId]: movie,
    };

    handleSummary(newObjCart);
  };

  /**
   * Decrement the quantity of a movie in the cart or remove it if it doesn't have quantity and update the total
   * @param {*} movieId
   */
  const handleDecrement = (movieId) => {
    const rawObjCart = { ...objCart };
    const movie = { ...rawObjCart[movieId] };

    if (movie.quantity) {
      movie.quantity -= 1;
    } else {
      movie.quantity = 0;
    }

    if (movie.quantity === 0) delete rawObjCart[movieId];
    else rawObjCart[movieId] = movie;

    handleSummary(rawObjCart);
  };

  return [
    { cart, total, subtotal, discount, movies, objCart },
    { handleIncrement, handleDecrement },
  ];
};

export default useExercise01;
