export type ShopItem = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = ShopItem & {
  quantity: number;
};

export type Cart = {
  cart: CartItem[];
  addProduct: (item: ShopItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};
