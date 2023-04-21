import React, { memo } from "react";
function MovieCard({ movie, handleAddToCart }) {
  return (
    <li className="movies__list-card">
      <ul>
        <li>{`ID: ${movie.id}`}</li>
        <li>{`Name: ${movie.name}`}</li>
        <li>{`Price: ${movie.price}`}</li>
      </ul>
      <button onClick={() => handleAddToCart(movie)}>Add to cart</button>
    </li>
  );
}

export default memo(MovieCard);
