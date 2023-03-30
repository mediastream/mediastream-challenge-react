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
import { useMemo, useReducer } from "react";

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
    m: [4, 2],
    discount: 0.1,
  },
  {
    m: [3, 2],
    discount: 0.25,
  },
  {
    m: [2, 4, 1],
    discount: 0.5,
  },
];

const reducer = (state, action) => {
  const actionReducer = ACTIONS_REDUCER[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};

const ACTIONS = {
  INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
  ADD_MOVIE_TO_CART: "ADD_MOVIE_TO_CART",
};

const ACTIONS_REDUCER = {
  [ACTIONS.INCREMENT_QUANTITY]: (state, action) => {
    const indexMovie = state.cart.findIndex(
      (movieCart) => movieCart.id === action.payload.id
    );
    const newMovie = { ...state.cart[indexMovie] };
    newMovie.quantity += 1;

    const newCart = state.cart.filter(
      (movieCart) => movieCart.id !== action.payload.id
    );
    newCart.push(newMovie);

    return { ...state, cart: newCart };
  },
  [ACTIONS.DECREMENT_QUANTITY]: (state, action) => {
    const indexMovie = state.cart.findIndex(
      (movieCart) => movieCart.id === action.payload.id
    );
    const newMovie = { ...state.cart[indexMovie] };
    newMovie.quantity -= 1;

    const newCart = state.cart.filter(
      (movieCart) => movieCart.id !== action.payload.id
    );
    if (newMovie.quantity > 0) {
      newCart.push(newMovie);
    }
    return { ...state, cart: newCart };
  },
  [ACTIONS.ADD_MOVIE_TO_CART]: ({ cart }, action) => {
    const isOnCart = cart.find(
      (movieCart) => movieCart.id === action.payload.id
    );
    if (isOnCart) {
      return { cart };
    } else {
      return { cart: [...cart, { ...action.payload, quantity: 1 }] };
    }
  },
};

export default function Exercise01() {
  const [{ cart }, dispatch] = useReducer(reducer, { cart: [] });

  const getTotal = useMemo(() => {
    const subTotal = cart.reduce((acc, movie) => {
      acc += movie.price * movie.quantity;
      return acc;
    }, 0);

    let discount = 0;
    discountRules.forEach((discountRule) => {
      if (discountRule.m.every((id) => cart.some((obj) => obj.id === id))) {
        discount = discountRule.discount;
      }
    });
    const total = subTotal - subTotal * discount
    return {
      subTotal,
      discount,
      total
    };
  }, [cart]);

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
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.ADD_MOVIE_TO_CART,
                    payload: o,
                  })
                }
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cartMovie) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {cartMovie.id}</li>
                <li>Name: {cartMovie.name}</li>
                <li>Price: ${cartMovie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DECREMENT_QUANTITY,
                      payload: cartMovie,
                    })
                  }
                >
                  -
                </button>
                <span>{cartMovie.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.INCREMENT_QUANTITY,
                      payload: cartMovie,
                    })
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
        <p>SubTotal: ${getTotal.subTotal}</p>
        <p>Discount: {getTotal.discount*100}%</p>
        <p style={{fontWeight:600}}>Total: ${getTotal.total}</p>
        </div>
      </div>
    </section>
  );
}
