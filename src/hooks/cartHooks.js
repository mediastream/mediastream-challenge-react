import { useContext } from "react";
import { CartContext, CartDispatchContext } from "../context/CartContext";

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}