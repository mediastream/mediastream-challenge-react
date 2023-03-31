import "./assets/styles.css";
import { useState } from "react";
import MovieCard from "./MovieCard";
import CartItem from "./CartItem";
import TotalCost from "./TotalCost";

const movies = [
  {
    id: 1,
    name: "Star Wars",
    price: 20,
  },
  {
    id: 2,
    name: "Back to the Future",
    price: 15,
  },
  {
    id: 3,
    name: "Jurassic Park",
    price: 25,
  },
  {
    id: 4,
    name: "Indiana Jones",
    price: 18,
  },
];

const Exercise01 = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (movie) => {
    const movieInCart = cart.find((m) => m.id === movie.id);
    if (movieInCart) {
      const updatedCart = cart.map((m) =>
        m.id === movie.id ? { ...m, quantity: m.quantity + 1 } : { ...m }
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  };

  const removeFromCart = (movie) => {
    const updatedCart = cart.filter((m) => m.id !== movie.id);
    setCart(updatedCart);
  };

  const decrementQuantity = (movie) => {
    if (movie.quantity > 1) {
      const updatedCart = cart.map((m) =>
        m.id === movie.id ? { ...m, quantity: m.quantity - 1 } : { ...m }
      );
      setCart(updatedCart);
    } else {
      removeFromCart(movie);
    }
  };

  const incrementQuantity = (movie) => {
    const updatedCart = cart.map((m) =>
      m.id === movie.id ? { ...m, quantity: m.quantity + 1 } : { ...m }
    );
    setCart(updatedCart);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          <div className="titleStore"> Movies Store </div>
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              onAddToCart={() => addToCart(movie)}
              key={movie.id}
            />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <div className="titleStore"> Cart </div>
        <ul>
          {cart.map((movie) => (
            <CartItem
              movie={movie}
              onRemoveFromCart={() => removeFromCart(movie)}
              onDecrementQuantity={() => decrementQuantity(movie)}
              onIncrementQuantity={() => incrementQuantity(movie)}
              key={movie.id}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          <TotalCost cart={cart} />
        </div>
      </div>
    </section>
  );
};

export default Exercise01;
