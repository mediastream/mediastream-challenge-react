export interface ShopItem {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends ShopItem {
  quantity: number;
}
