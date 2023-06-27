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
import { movies, discountRules } from "./utils";

export default function Exercise01() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Star Wars",
      price: 20,
      quantity: 2,
    },
  ]);

  const getDiscount = () => {
    const idArr = cart.map((x) => x.id).sort();
    for (let i = 0; i < discountRules.length; i++) {
      const arrayToCompare = discountRules[i].m.sort();
      if (arrayToCompare.toString() === idArr.toString()) {
        return discountRules[i].discount;
      }
    }
    return 0;
  };

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total - total * getDiscount();
  };

  const decreaseOnIndex = (index) => {
    if (cart[index].quantity === 1) {
      // delete item
      const newAnswer = cart.toSpliced(index, 1);
      setCart(newAnswer);
    } else {
      // decrease quantity
      const newAnswer = cart.map((x, ind) => {
        if (ind !== index) return x;
        else {
          return { ...x, quantity: x.quantity - 1 };
        }
      });
      setCart(newAnswer);
    }
  };

  const increaseOnIndex = (index) => {
    const newAnswer = cart.map((x, ind) => {
      if (ind !== index) return x;
      else {
        return { ...x, quantity: x.quantity + 1 };
      }
    });
    setCart(newAnswer);
  };

  const addToCart = (newMovie) => {
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === newMovie.id) {
        index = i;
      }
    }
    if (index === -1) {
      setCart([...cart, { ...newMovie, quantity: 1 }]);
    } else {
      increaseOnIndex(index);
    }
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card">
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
          {cart.map((x, index) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decreaseOnIndex(index)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => increaseOnIndex(index)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  );
}
