import { useMemo, useState } from "react";
import { discountRules } from "../const/discounts";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, mov) => acc + mov.price * mov.quantity, 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (subtotal === 0) return 0;
    const availablesDiscounts = [];

    discountRules.forEach(({ m: moviesWithDiscount, discount }) => {
      if (moviesWithDiscount.every((mov) => cart.find((art) => art.id === mov)))
        availablesDiscounts.push(discount);
    });

    if (availablesDiscounts.length === 0) return 0;

    const discountToApply = Math.max(...availablesDiscounts);

    return discountToApply;
  }, [subtotal]);

  const modifyQuantity = (cart, itemIndex, newQuantity) => {
    const tempCart = [...cart];
    const newItem = { ...tempCart[itemIndex], quantity: newQuantity };
    tempCart.splice(itemIndex, 1, newItem);
    return tempCart;
  };

  const addToCart = (mov) => {
    const itemIndex = cart.findIndex((m) => m.id === mov.id);
    const alreadyInCart = itemIndex !== -1;

    if (!alreadyInCart) return setCart([...cart, { ...mov, quantity: 1 }]);

    const newQuantity = cart[itemIndex].quantity + 1;
    const newCart = modifyQuantity(cart, itemIndex, newQuantity);
    setCart(newCart);
  };

  const removeOfCart = (movId) => {
    const itemIndex = cart.findIndex((m) => m.id === movId);
    const existInCart = itemIndex !== -1;

    if (!existInCart) return;

    if (cart[itemIndex].quantity === 1)
      return setCart(cart.filter((m) => m.id !== movId));

    const newQuantity = cart[itemIndex].quantity - 1;
    const newCart = modifyQuantity(cart, itemIndex, newQuantity);
    setCart(newCart);
  };

  return {
    cart,
    subtotal,
    discount,
    addToCart,
    removeOfCart,
  };
};
