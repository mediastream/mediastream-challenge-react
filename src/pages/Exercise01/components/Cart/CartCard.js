import React, { memo } from "react";

function CartCard({ movie, handleChangeCart }) {
  return (
    <li className="movies__cart-card">
      <ul>
        <li>{`ID: ${movie.id}`}</li>
        <li>{`Name: ${movie.name}`}</li>
        <li>{`Price: ${movie.price}`}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => handleChangeCart(movie.id, -1)}>-</button>
        <span>{movie.quantity}</span>
        <button onClick={() => handleChangeCart(movie.id, 1)}>+</button>
      </div>
    </li>
  );
}

export default memo(CartCard);
