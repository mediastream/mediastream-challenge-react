import { useState, useEffect } from "react";
import Utils from "../utils/Utils";
import { discountRules } from "../data/discountRules";

function useMyCart() {
  const [myCart, setMyCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [discount, applyDiscount] = Utils();

  useEffect(() => {
    getTotal();
  });

  const addMovieToCart = (movie) => {
    const movieToAdd = { ...movie, quantity: 1 };
    const movieOnCart = myCart.find((el) => el.id === movie.id);
    if (movieOnCart) {
      alert("Movie already added in the Cart");
      return;
    }
    setMyCart([...myCart, movieToAdd]);
  };

  const handleQuantity = (type, movie) => {
    if (type === "increment") return { ...movie, quantity: movie.quantity + 1 };
    if (type === "decrement") return { ...movie, quantity: movie.quantity - 1 };
  };

  const incrementMovieQuantity = ({ id }) => {
    setMyCart(
      myCart.map((movie) => {
        return movie.id === id
          ? handleQuantity("increment", movie)
          : { ...movie };
      })
    );
  };

  const removeFromCart = (movieId) => {
    const { quantity } = myCart.find((el) => el.id === movieId);
    if (quantity === 1) {
      setMyCart(myCart.filter((el) => el.id !== movieId));
    }
  };

  const decreaseMovieQuantity = ({ id }) => {
    setMyCart(
      myCart.map((movie) => {
        return movie.id === id
          ? handleQuantity("decrement", movie)
          : { ...movie };
      })
    );
    removeFromCart(id);
  };

  const getTotal = () => {
    const total = myCart.reduce((prev, current) => {
      return prev + current.price * current.quantity;
    }, 0);
    const moviesOnCart = myCart.map((el) => el.id);
    applyDiscount(moviesOnCart, discountRules);
    setTotalCart(discount !== 0 ? total - discount : total);
  };
  return {
    myCart,
    totalCart,
    addMovieToCart,
    incrementMovieQuantity,
    decreaseMovieQuantity,
  };
}

export default useMyCart;
