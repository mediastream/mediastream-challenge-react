import { useCallback, useMemo, useState } from "react";

const useShoppingCart = ({ initialCart = [], discountRules = [] }) => {
  const [cart, setCart] = useState(initialCart);

  const findItemCart = useCallback(
    (item) => cart.findIndex((cartItem) => cartItem.id === item.id),
    [cart]
  );

  const incrementQuantity = useCallback(
    (item) => {
      const newCart = [...cart];
      const currentItemIndex = findItemCart(item);

      newCart[currentItemIndex].quantity += 1;

      setCart(newCart);
    },
    [cart, findItemCart]
  );

  const decrementQuantity = useCallback(
    (item) => {
      let newCart = [...cart];
      const currentItemIndex = findItemCart(item);

      if (newCart[currentItemIndex].quantity === 1) {
        newCart = newCart.filter((it) => it.id !== item.id);
      } else {
        newCart[currentItemIndex].quantity -= 1;
      }

      setCart(newCart);
    },
    [cart, findItemCart]
  );

  const addToCard = useCallback(
    (item) => {
      findItemCart(item) === -1
        ? setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }])
        : incrementQuantity(item);
    },
    [findItemCart, incrementQuantity]
  );

  const subTotal = useMemo(
    () =>
      cart.reduce((acc, current) => acc + current.price * current.quantity, 0),
    [cart]
  );

  const discount = useMemo(() => {
    const cartIds = cart.map((m) => m.id).sort();
    const foundRule = discountRules.find(
      (e) => JSON.stringify(e.m.sort()) === JSON.stringify(cartIds)
    );

    return foundRule ? foundRule.discount : 0;
  }, [cart, discountRules]);

  const total = useMemo(() => subTotal * (1 - discount), [discount, subTotal]);

  return {
    cart,
    addToCard,
    incrementQuantity,
    decrementQuantity,
    total,
    subTotal,
    discount,
  };
};

export default useShoppingCart;
