import React from "react";
import MovieCard from "./MovieCard";

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

function MoviesList({ cart, setCart }) {
  const handleAddToCart = (movie) => {
    // Si la pelicula ya esta en el carro, modificamos la cantidad
    const movieExist = cart.find((cartItem) => cartItem.id === movie.id);
    if (movieExist) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === movie.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      // Agregamos al carro
      setCart((cart) => [...cart, { ...movie, quantity: 1 }]);
    }
  };

  return (
    <div className="movies__list">
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;
