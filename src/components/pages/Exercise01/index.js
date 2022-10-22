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
    setCart(() => {
      if (cart.find((item) => item.id === movie.id)) {
        return cart.map((item) => {
          if (item.id === movie.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return cart.concat({ ...movie, quantity: 1 });
    });
  };

  const incrementItem = (id) => {
    setCart(() => {
      return cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decrementItem = (id) => {
    setCart(() => {
      return cart.reduce((acc, movie) => {
        if (movie.id === id) {
          if (movie.quantity - 1 > 0) {
            acc.push({ ...movie, quantity: movie.quantity - 1 });
            return acc;
          }
          return acc;
        }
        acc.push(movie);
        return acc;
      }, []);
    });
  };

  const getDiscount = () => {
    let idList = cart.map((item) => item.id);
    let discount = 0;

    discountRules.forEach((item) => {
      if (item.m.every((value) => idList.includes(value))) {
        if (discount < item.discount) {
          discount = item.discount;
        }
      }
    });
    return discount;
  };

  const getTotal = () => {
    const discount = getDiscount();
    const gross = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    if (discount) {
      return gross - gross * discount;
    }
    return gross;
  }; // TODO: Implement this

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.length > 0 ? (
            cart.map((x) => (
              <li key={x.id} className="movies__cart-card">
                <ul>
                  <li>ID: {x.id}</li>
                  <li>Name: {x.name}</li>
                  <li>Price: ${x.price}</li>
                </ul>
                <div className="movies__cart-card-quantity">
                  <button onClick={() => decrementItem(x.id)}>-</button>
                  <span>{x.quantity}</span>
                  <button onClick={() => incrementItem(x.id)}>+</button>
                </div>
              </li>
            ))
          ) : (
            <h4>No items in the cart</h4>
          )}
        </ul>

        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
          <span>Discount: {getDiscount() * 100}%</span>
        </div>
      </div>
    </section>
  );
}
