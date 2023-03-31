export interface Movie {
  id: number;
  name: string;
  price: number;
}
export type CartItem = Movie & {
  quantity: number;
};

export type Cart = {
  cart: CartItem[];
  addProduct: (item: Movie) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};
