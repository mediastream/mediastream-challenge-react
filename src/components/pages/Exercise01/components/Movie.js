import React from "react";

export const Movie = ({ item, isAdded, addToCart }) => {
  return (
    <li key={item.id} className="movies__list-card">
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      {isAdded(item) ? (
        <button onClick={() => addToCart(item)}>Add to cart</button>
      ) : (
        <button>Added</button>
      )}
    </li>
  );
};
