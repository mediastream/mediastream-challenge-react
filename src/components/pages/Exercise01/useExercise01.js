import { useState } from 'react'
import { movies, discountRules } from './db';

export default function useExercise01() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ]);

  function getTotal() {
    return 0;
  }

  function handleDecrementQty(id) {
    console.log('handleDecrementQty');
  }

  function handleIncrementQty(id) {
    console.log('handleIncrementQty');
  }

  function handleAddToCart() {
    console.log('handleAddToCart');
  }

  return {
    cart,
    movies,
    discountRules,
    handleIncrementQty,
    handleDecrementQty,
    handleAddToCart,
    getTotal
  }
}
