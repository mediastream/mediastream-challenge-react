import React from 'react';

const CartItemComponent = ({ item, onDecrement, onAdd }) => {
  return (
    <li className='movies__cart-card'>
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      <div className='movies__cart-card-quantity'>
        <button onClick={onDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItemComponent;
