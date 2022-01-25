/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * [READY] 1. Add a movie to the cart
 * [READY] 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * [READY] 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * [READY] 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import useCart from "./hooks/useCart";
import { CartProvider } from "./context/CartContext";
import { MOVIES_LIST, DISCOUNT_RULES } from "./data";

import { MoviesList, Cart } from "./components";

import "./assets/styles.css";

const initialCart = [
  {
    id: 1,
    name: "Star Wars",
    price: 20,
    quantity: 2,
  },
];

export default function Exercise01() {
  const {
    cart,
    addToCard,
    incrementQuantity,
    decrementQuantity,
    total,
    subTotal,
    discount,
  } = useCart({ initialCart, discountRules: DISCOUNT_RULES });

  return (
    <CartProvider
      value={{
        cart,
        addToCard,
        incrementQuantity,
        decrementQuantity,
        total,
        subTotal,
        discount,
      }}
    >
      <section className="exercise01">
        <MoviesList movies={MOVIES_LIST} />

        <Cart />
      </section>
    </CartProvider>
  );
}
