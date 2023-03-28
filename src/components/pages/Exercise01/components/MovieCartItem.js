import React, { memo } from "react";

export const CART_OPERATION = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

const MovieCartItem = ({
  id,
  name,
  price,
  quantity,
  modifyQty,
  removeItem,
}) => {
  return (
    <li className="movies__cart-card">
      <div
        title="Remover"
        className="movies__cart-card-remove"
        onClick={() => removeItem({ id })}
      >
        ❌
      </div>

      <ul>
        <li>
          <span>ID:</span>
          <span>{id}</span>
        </li>
        <li>
          <span>Name:</span>
          <span>{name}</span>
        </li>
        <li>
          <span>Price:</span>
          <span>${price}</span>
        </li>
      </ul>

      <div className="movies__cart-card-quantity">
        <button
          onClick={() => modifyQty(CART_OPERATION.DECREMENT, { id }, quantity)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => modifyQty(CART_OPERATION.INCREMENT, { id }, quantity)}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default memo(MovieCartItem);
