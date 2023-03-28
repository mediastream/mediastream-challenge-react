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

  const addToCart = (movie) => {
    const itemInCart = cart.find((item) => item.id === movie.id);
    if (itemInCart) {
      incrementQuantity(itemInCart);
    } else {
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  };

  const incrementQuantity = (item) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((cartItem) => cartItem.id === item.id);
    newCart[itemIndex].quantity++;
    setCart(newCart);
  };

  const decrementQuantity = (item) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((cartItem) => cartItem.id === item.id);
    if (newCart[itemIndex].quantity > 1) {
      newCart[itemIndex].quantity--;
    } else {
      newCart.splice(itemIndex, 1);
    }
    setCart(newCart);
  };

  const removeItem = (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newCart);
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const rule = discountRules.find((rule) =>
        rule.m.every((movieId) =>
          cart.some((cartItem) => cartItem.id === movieId)
        )
      );
      if (rule) {
        const discount = itemTotal * rule.discount;
        total -= discount;
      }
    });
    return total.toFixed(2);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart__list">
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li className="cart__list-card" key={item.id}>
              <ul>
                <li>Name: {item.name}</li>
                <li>Price: ${item.price}</li>
                <li>
                  Quantity:
                  <button onClick={() => decrementQuantity(item)}>-</button>
                  {item.quantity}
                  <button onClick={() => incrementQuantity(item)}>+</button>
                </li>
                <li>
                  <button onClick={() => removeItem(item)}>Remove item</button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <h3>Total: ${getTotal()}</h3>
      </div>
    </section>
  );
}