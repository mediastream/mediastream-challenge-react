/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 OK * 1. Add a movie to the cart
 OK * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 OK * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 Ok * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useState, useEffect } from "react";
import "./assets/styles.css";

export default function Exercise01() {
  const INITIAL_VALUES = {
    discount: 0,
    moviesAmount: 0,
    quantity: 1,
    totalPrice: 0,
    subTotalPrice: 0,
    cart: [
      {
        id: 1,
        name: "Star Wars",
        price: 20,
        quantity: 2,
      },
    ],
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

  const [cart, setCart] = useState(INITIAL_VALUES.cart);

  const [totalPrice, setTotalPrice] = useState(INITIAL_VALUES.totalPrice);
  const [subTotalPrice, setSubTotalPrice] = useState(INITIAL_VALUES.subTotalPrice);
  const [discount, setDiscount] = useState(INITIAL_VALUES.discount);

  useEffect(() => {
    const items = cart.map((item) => {
      return (item.total = item.quantity * item.price);
    });
    const subtotal = items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setSubTotalPrice(subtotal);

    const maxDiscount = checkDiscount();
    applyDiscount(maxDiscount, subtotal);
  }, [cart]);

  const checkDiscount = () => {
    const cartIds = cart.map((item) => item.id);

    const discountRule = discountRules.map((rule) => {
      const discountRule = rule.m.every((id) => {
        return cartIds.includes(id);
      });

      if (discountRule) {
      }
      return discountRule ? rule.discount : 0;
    });

    const maxDiscount = Math.max(...discountRule);
    setDiscount(maxDiscount);

    return maxDiscount;
  };

  const applyDiscount = async (maxDiscount, subtotal) => {
    const discounted_price = subtotal - (subtotal * maxDiscount) / 100;
    await setTotalPrice(discounted_price.toFixed(2));
  };

  const decrementMovie = (movie) => {
    const { id } = movie;
    const itemsCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity--;
      }
      return item;
    });

    const newCart = itemsCart.filter(function (item) {
      return item.quantity !== INITIAL_VALUES.moviesAmount;
    });
    setCart(newCart);
  };

  const incrementMovie = (movie) => {
    const { id } = movie;
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    setCart(newCart);
  };

  const addMovie = (movie) => {
    movie.quantity = INITIAL_VALUES.quantity;
    setCart([...cart, movie]);
  };

  const handleAddToCart = (movie) => {
    const movieDuplicated = cart.filter((item) => item.id === movie.id);
    return movieDuplicated.length ? incrementMovie(movieDuplicated[0]) : addMovie(movie);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(({ id, name, price }, index) => (
            <li key={index} className="movies__list-card">
              <ul>
                <li>ID: {id}</li>
                <li>Name: {name}</li>
                <li>Price: ${price}</li>
              </ul>
              <button onClick={() => handleAddToCart({ id, name, price })}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        {cart.length ? (
          <>
            <ul>
              {cart.map(({ id, name, price, quantity }, index) => (
                <li key={index} className="movies__cart-card">
                  <ul>
                    <li>ID: {id}</li>
                    <li>Name: {name}</li>
                    <li>Price: ${price}</li>
                  </ul>
                  <div className="movies__cart-card-quantity">
                    <button onClick={() => decrementMovie({ id, name, price })}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => incrementMovie({ id, name, price })}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="movies__cart-total">
              <p>Sub-total: ${subTotalPrice}</p>
              <p>Discount: {discount}%</p>
              <div className="total-price">
                <h2>Total: ${totalPrice}</h2>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Cart empty =( </p>
            <br />
            <p>Try to add some movies </p>
          </>
        )}
      </div>
    </section>
  );
}
