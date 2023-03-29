import React from "react";

export const Cart = ({ item, updateQuantity }) => {
  return (
    <li key={item.id} className="movies__cart-card">
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => updateQuantity(item, "decrement")}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item, "increment")}>+</button>
      </div>
    </li>
  );
};
