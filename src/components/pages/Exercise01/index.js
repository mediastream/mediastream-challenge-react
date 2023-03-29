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
import { useEffect, useState } from "react";

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

  const [cart, setCart] = useState();

  useEffect(() => {
    setCart([
      {
        id: 1,
        name: "Star Wars",
        price: 20,
        discount: applyDiscount(1, 20),
        quantity: 2,
      },
    ]);
  }, []);

  const applyDiscount = (id, price) => {
    const sumDiscount = discountRules.reduce((accumulator, { m, discount }) => {
      const findId = m.some((e) => e === id);
      return findId ? accumulator + discount : accumulator;
    }, 0);
    return price * sumDiscount;
  };

  const addCart = (product) => {
    const index = cart.findIndex((e) => e.id === product.id);
    if (index === -1)
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          discount: applyDiscount(product.id, product.price),
        },
      ]);
  };

  const increaseBy = (product, value) => {
    const newValue = product.quantity + value;
    if (newValue) {
      setCart(
        cart.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + value,
              }
            : p
        )
      );
    } else {
      setCart(cart.filter((p) => p.id !== product.id));
    }
  };

  const getTotal = () => {
    return cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.discount,
      0
    );
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
              <button onClick={() => addCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart &&
            cart.map((x) => (
              <li className="movies__cart-card" key={x.id}>
                <ul>
                  <li>ID: {x.id}</li>
                  <li>Name: {x.name}</li>
                  <li>Price: ${x.price}</li>
                </ul>
                <div className="movies__cart-card-quantity">
                  <button onClick={() => increaseBy(x, -1)}>-</button>
                  <span>{x.quantity}</span>
                  <button onClick={() => increaseBy(x, +1)}>+</button>
                </div>
              </li>
            ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${cart && getTotal()}</p>
        </div>
      </div>
    </section>
  );
}
