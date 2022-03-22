import React from 'react'

const Cart = ({ cart, decrementItem, incrementItem }) => {
  return (
    <ul>
      {cart.map(item => (
        <li key={item.id} className="movies__cart-card">
          <ul>
            <li>
              ID: {item.id}
            </li>
            <li>
              Name: {item.name}
            </li>
            <li>
              Price: ${item.price}
            </li>
          </ul>
          <div className="movies__cart-card-quantity">
            <button onClick={() => decrementItem(item)}>
              -
            </button>
            <span>
              {item.quantity}
            </span>
            <button onClick={() => incrementItem(item)}>
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Cart