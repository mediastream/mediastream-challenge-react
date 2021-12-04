import React, { memo } from "react";
import { discountRules } from "../mock";

const ASC = (a, b) => a - b;

const getTotal = (cart) => {
  let total = 0;
  let subtotal = 0;
  let discount = "";
  if(cart.length !== 0){
    subtotal = cart.reduce((acum, currentMovie) => acum + currentMovie.quantity * currentMovie.price, 0);
    const moviesId = JSON.stringify(cart.map(m => m.id).sort(ASC));
    console.log(moviesId);
    const foundRule = discountRules.find(e => JSON.stringify(e.m.sort(ASC)) === moviesId );
    if(foundRule) {
      total = subtotal * (1 - foundRule.discount);
      discount = `${foundRule.discount * 100}%`;
    }
    else {
      total = subtotal;
    }
  }
  
  return { total, subtotal, discount };
}

const renderItem = (movie, i, add, remove) => (
  <li key={i} className="movies__cart-card">
    <ul>
      <li>ID: {movie.id}</li>
      <li>Name: {movie.name}</li>
      <li>Price: ${movie.price}</li>
    </ul>
    <div className="movies__cart-card-quantity">
      <button onClick={() => remove(movie)}>
        -
      </button>
      <span>{movie.quantity}</span>
      <button onClick={() => add(movie)}>
        +
      </button>
    </div>
  </li>
)

const Cart = ({ cart = [], add, remove }) => {
  const { subtotal, total, discount } = getTotal(cart);
  return (
    <div className="movies__cart">
      <ul>
        {cart.map((movie, i) => renderItem(movie, i, add, remove) )}
      </ul>
      {discount !== "" && (
        <>
          <div className="movies__cart-subtotal">
            <p>Subtotal: $<strike>{subtotal}</strike> <span className="movies__cart-discount"> ({discount} de descuento)</span></p> 
          </div>
        </>
      )}
      <div className="movies__cart-total">
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default memo(Cart);