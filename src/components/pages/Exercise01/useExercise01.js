import { useState } from 'react'

export default function useExercise01() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ]);

  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ];

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
