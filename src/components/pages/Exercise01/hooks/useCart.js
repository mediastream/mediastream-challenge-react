import { useState } from 'react';

import { discountRules } from '../assets/data';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decrementItem = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (itemInCart.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  //get total and apply discount rules
  const getTotal = () => {
    let total = 0;
    let discount = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    discountRules.forEach((rule) => {
      let ruleMatch = true;

      rule.m.forEach((id) => {
        if (!cart.find((item) => item.id === id)) {
          ruleMatch = false;
        }
      });

      if (ruleMatch) {
        discount += total * rule.discount;
      }
    });

    return {
      total: total - discount,
      discount,
    };
  };

  return {
    cart,
    addToCart,
    decrementItem,
    getTotal,
  };
};
