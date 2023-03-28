import React from "react";

const MoviesList = ({ movies = [], addItemToCart }) => (
  <div className="movies__list">
    {!!movies.length && <p className="cart__title">{`Movies List:`}</p>}

    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className="movies__list-card">
          <ul>
            <li>
              ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {movie.id}
            </li>
            <li>Name: &nbsp;{movie.name}</li>
            <li>Price:&nbsp;&nbsp;&nbsp;&nbsp;{`$${movie.price}`}</li>
          </ul>

          <button onClick={() => addItemToCart(movie)}>Add to cart</button>
        </li>
      ))}
    </ul>
  </div>
);

export default MoviesList;
