import { createContext, useContext } from "react";

export const CartContext = createContext({
  cart: [],
  addToCard: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  total: 0,
  subTotal: 0,
  discount: 0,
});

export const CartProvider = CartContext.Provider;

export const useCartContext = () => useContext(CartContext);
