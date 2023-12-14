import React from "react";

const ShoppingCart = ({ cart, removeFromCart, addToCart }) => {
  return (
    <div className='movies__cart'>
      {cart.length === 0 && <span>The cart is empty</span>}
      <ul>
        {cart.map((item) => (
          <li className='movies__cart-card' key={item.id}>
            <ul>
              <li>ID: {item.id}</li>
              <li>Name: {item.name}</li>
              <li>Price: ${item.price}</li>
            </ul>
            <div className='movies__cart-card-quantity'>
              <button onClick={() => removeFromCart(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
