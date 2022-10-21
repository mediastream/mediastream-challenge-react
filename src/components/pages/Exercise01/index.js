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
import React, { useEffect, useState } from "react";

const Exercise01 = () => {
  const [total, setTotal] = useState(0);
  const [hasDiscount, setHasDiscount] = useState({
    applied: false,
    percentage: 0,
  });
  const [cart, setCart] = useState([]);

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
      applyDiscount: () =>
        cart.length === 2 &&
        cart.some((movie) => movie.id === 3) &&
        cart.some((movie) => movie.id === 2),
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
      applyDiscount: () =>
        cart.length === 3 &&
        cart.some((movie) => movie.id === 2) &&
        cart.some((movie) => movie.id === 4) &&
        cart.some((movie) => movie.id === 1),
    },
    {
      m: [4, 2],
      discount: 0.1,
      applyDiscount: () =>
        cart.length === 2 &&
        cart.some((movie) => movie.id === 4) &&
        cart.some((movie) => movie.id === 2),
    },
  ];
  const discount = (number, percentage) =>
    Math.abs(number * percentage - number);

  useEffect(() => {
    setHasDiscount({
      applied: false,
      percentage: 0,
    });
    for (let index = 0; index < discountRules.length; index++) {
      const element = discountRules[index];
      if (element.applyDiscount()) {
        setTotal(discount(getTotal(), element.discount));
        setHasDiscount({
          applied: true,
          percentage: element.discount,
        });
        return;
      }
    }

    if (!hasDiscount.applied) setTotal(getTotal());
  }, [cart, hasDiscount.applied]);

  const quantityManager = (motionPicture, action = "increase") => {
    const movieIndex = cart.findIndex((movie) => movie.id === motionPicture.id);
    const movieList = cart;
    movieList[movieIndex].quantity =
      action === "increase"
        ? (movieList[movieIndex].quantity += 1)
        : (movieList[movieIndex].quantity -= 1);

    if (movieList[movieIndex].quantity === 0) {
      setCart(cart.filter((item) => item.id !== motionPicture.id));
      return;
    }
    setCart([...movieList]);
  };

  const addToCart = (motionPicture) => {
    if (cart.some((movie) => movie.id === motionPicture.id)) {
      quantityManager(motionPicture);
      return;
    }

    setCart((previousCart) => [
      ...previousCart,
      { ...motionPicture, quantity: 1 },
    ]);
  };

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

  const getTotal = () => {
    if (!cart.length) return 0;

    if (cart.length === 1) return cart[0].price * cart[0].quantity;

    return cart.reduce((previousValue, currentValue, i) => {
      if (i === 1) {
        return (
          previousValue?.price * previousValue?.quantity +
          currentValue?.price * currentValue.quantity
        );
      }

      return previousValue + currentValue.price * currentValue.quantity;
    });
  };

  return (
    <div className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li key={o.name} className="movies__list-card">
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
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <li key={x.name} className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => quantityManager(x, "decrease")}>
                  -
                </button>
                <span>{x.quantity}</span>
                <button onClick={() => quantityManager(x)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>
            Total: ${total}
            <small style={{ fontSize: 12, marginLeft: 5 }}>
              {hasDiscount?.applied &&
                `(${hasDiscount.percentage * 100}% discount applied)`}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exercise01;
