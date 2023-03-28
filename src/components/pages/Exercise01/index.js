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

import { useEffect, useState } from "react";
import MoviesCart, { CART_OPERATION } from "./components/MoviesCart";
import MoviesList from "./components/MovieList";
import "./assets/styles.css";

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

const Exercise01 = () => {
  const [cart, setCart] = useState([movies[0]]);
  const [cartIndex, setCartIndex] = useState({ [movies[0].id]: 1 });
  const [appliedDiscount, setAppliedDiscount] = useState({
    totalDiscount: 0,
    rules: [],
  });

  const addItemToCart = (item) => {
    let prevItemQty = (cartIndex && cartIndex[item.id]) || 0;
    if (!cartIndex[item.id]) {
      setCart((prevCart) => [...prevCart, item]);
    }
    modifyQty(CART_OPERATION.INCREMENT, item, prevItemQty);
  };

  const removeItemFromCart = (item) => {
    const cartIndexCpy = { ...cartIndex };
    delete cartIndexCpy[item.id];
    setCartIndex({ ...cartIndexCpy });
    const nextCartItems = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(nextCartItems);
  };

  const modifyQty = (operation, item, value) => {
    if (operation === CART_OPERATION.INCREMENT) {
      return setCartIndex((prevCartIndex) => ({
        ...prevCartIndex,
        [item.id]: value + 1,
      }));
    }
    if (operation === CART_OPERATION.DECREMENT) {
      if (value <= 1) {
        return removeItemFromCart(item);
      }
      return setCartIndex((prevCartIndex) => ({
        ...prevCartIndex,
        [item.id]: value - 1,
      }));
    }
  };

  useEffect(() => {
    const addedMoviesIds = Object.keys(cartIndex).sort();
    if (addedMoviesIds.length) {
      let ruleIdx = 1;
      let totalDiscount = 0;
      const appliedRules = [];
      for (const discRule of discountRules) {
        const ruleMovieIds = discRule.m.sort().map(String);
        const hasAllIds = ruleMovieIds.every((rmi) =>
          addedMoviesIds.includes(rmi)
        );
        if (hasAllIds) {
          appliedRules.push(ruleIdx);
          totalDiscount += discRule.discount;
        }
        ruleIdx++;
      }
      setAppliedDiscount({ totalDiscount, rules: appliedRules });
    }
  }, [cartIndex]);

  return (
    <section className="exercise01">
      <h1 className="section__title">Retro Movie Store</h1>

      <MoviesList movies={movies} addItemToCart={addItemToCart} />

      <MoviesCart
        cartItems={cart}
        itemIndex={cartIndex}
        modifyQty={modifyQty}
        discount={appliedDiscount}
        removeItem={removeItemFromCart}
      />
    </section>
  );
};

export default Exercise01;
