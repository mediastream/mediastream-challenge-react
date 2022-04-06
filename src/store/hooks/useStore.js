import React from "react";
import { actionStoreTypes as actionTypes } from "../actions";
import { storeReducer } from "../reducers";

export function useStore({ reducer = storeReducer } = {}) {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [{ cart }, dispatch] = React.useReducer(reducer, {
    cart: [],
  });

  const cartIds = cart.map(item => item.id)

  const getTotal = () =>
    cart.reduce((result, item) => {
      const discount = discountRules.find((discount) =>
          discount.m.every(i => cartIds.includes(i))
      );

      if (discount) {
        return (
          result + (item.price - item.price * discount.discount) * item.quantity
        );
      }

      return result + item.price * item.quantity;
    }, 0);

  const addToCart = (movie) => dispatch({ type: actionTypes.addToCart, movie });
  const removeFromCart = (item) =>
    dispatch({ type: actionTypes.removeFromCart, item });
  const increaseCart = (item) =>
    dispatch({ type: actionTypes.increaseCart, item });

  return { cart, getTotal, addToCart, movies, removeFromCart, increaseCart };
}
