import { createContext, useContext, useState } from 'react';
import type { Cart, CartItem, ShopItem } from 'types/shop';

const CartContext = createContext<Cart>({
  cart: [],
  addProduct: (item: ShopItem) => {},
  increaseQuantity: (id: number) => {},
  decreaseQuantity: (id: number) => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (item: ShopItem) => {
    const index = cart.findIndex((el) => el.id === item.id);
    if (index < 0) {
      setCart((prev) => {
        const arr = [...prev];
        arr.push({ ...item, quantity: 1 });
        return arr;
      });
    } else {
      increaseQuantity(item.id);
    }
  };

  const increaseQuantity = (id: number) => {
    const index = cart.findIndex((el) => el.id === id);
    if (index < 0) return;
    setCart((prev) =>
      prev.reduce((acc, cur) => {
        if (cur.id === id) {
          return [...acc, { ...cur, quantity: cur.quantity + 1 }];
        }
        return [...acc, cur];
      }, [] as CartItem[])
    );
  };

  const decreaseQuantity = (id: number) => {
    const index = cart.findIndex((el) => el.id === id);
    if (index < 0) return;
    if (cart[index].quantity < 2) {
      setCart((prev) => {
        const arr = [...prev];
        arr.splice(index, 1);
        return arr;
      });
    } else {
      setCart((prev) =>
        prev.reduce((acc, cur) => {
          if (cur.id === id) {
            return [...acc, { ...cur, quantity: cur.quantity - 1 }];
          }
          return [...acc, cur];
        }, [] as CartItem[])
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
