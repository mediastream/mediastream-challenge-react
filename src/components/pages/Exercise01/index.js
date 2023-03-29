/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState } from "react";
import { Cart } from "./components/Cart";
import { Movie } from "./components/Movie";
import { TotalCart } from "./components/TotalCart";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 2,
    },
  ]);

  // Calculate total price
  const getTotal = () =>
    cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    );

  // Calculate total discount
  const getDiscount = () => {
    let discount = 0;
    for (const r of discountRules) {
      if (r.m.length === cart.length) {
        let isDiscount = true;
        for (const m of r.m) {
          isDiscount = cart.findIndex((c) => c.id === m) !== -1;
          if (!isDiscount) {
            break;
          }
        }
        if (isDiscount) {
          discount = r.discount;
          break;
        }
      }
    }
    return getTotal() * discount;
  };

  // Calculate total pay
  const getTotalPay = () => getTotal() - getDiscount();

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  // Validate if item to exist
  const isAdded = (item) => {
    return cart.findIndex((c) => c.id === item.id) === -1;
  };

  // update quantity to pay
  const updateQuantity = (item, operation) => {
    const newQuantity =
      operation === "increment" ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity > 0) {
      const newCart = cart.map((c) => {
        if (c.id === item.id) {
          return {
            ...c,
            quantity: newQuantity,
          };
        }
        return c;
      });

      setCart(newCart);
    } else {
      const newCart = cart.filter((c) => c.id !== item.id);
      setCart(newCart);
    }
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((item) => (
            <Movie
              key={item.id}
              item={item}
              isAdded={isAdded}
              addToCart={addToCart}
            />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((item) => (
            <Cart key={item.id} item={item} updateQuantity={updateQuantity} />
          ))}
        </ul>
        <TotalCart
          getTotal={getTotal}
          getDiscount={getDiscount}
          getTotalPay={getTotalPay}
        />
      </div>
    </section>
  );
}
