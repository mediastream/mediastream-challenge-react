/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { createContext, useContext, useState } from 'react';
import { DISCOUNT_RULES } from 'utilities/constants';
import type { CartItem, ShopItem } from '../../types/Cart';

const CartContext = createContext<any>({
  cart: [],
  addProduct: (item: ShopItem) => {},
  increaseQuantity: (id: number) => {},
  decreaseQuantity: (id: number) => {},
  getTotal: () => 0,
  discounts: []
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (movie: ShopItem) => {
    const rta = cart.some((item: ShopItem) => item.id === movie.id);
    if (!rta) {
      const quantity = { quantity: 1 };
      setCart([...cart, { ...movie, ...quantity }]);
    }
  };

  const getTotal = () => {
    const discountTotal = applyDiscount().reduce((sum, item) => sum + item, 0);
    let netoTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    netoTotal = netoTotal - netoTotal * discountTotal;
    return netoTotal;
  };

  const applyDiscount = () => {
    const withDiscount: number[] = [];
    DISCOUNT_RULES.forEach((item) => {
      let discountRuleAdd = true;
      item.rule.forEach((rule) => {
        const rta = cart.some((item) => item.id === rule);
        if (!rta) {
          discountRuleAdd = false;
        }
      });
      if (discountRuleAdd) {
        withDiscount.push(item.discount);
      }
    });
    return withDiscount;
  };

  const increaseQuantity = (id: number) => {
    const index = cart.findIndex((item) => item.id === id);
    cart[index].quantity += 1;
    setCart([...cart]);
  };

  const decreaseQuantity = (id: number) => {
    const index = cart.findIndex((item) => item.id === id);
    cart[index].quantity -= 1;
    if (cart[index].quantity > 0) {
      setCart([...cart]);
    } else {
      cart.splice(index, 1);
      setCart([...cart]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        applyDiscount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
