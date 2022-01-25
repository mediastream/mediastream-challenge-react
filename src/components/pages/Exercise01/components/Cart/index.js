import { useCartContext } from "../../context/CartContext";

import { formatCurrencyValue } from '../../utils'

import "./styles.css";

const Cart = () => {
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    total,
    subTotal,
    discount,
  } = useCartContext();

  return (
    <div className="movies__cart">
      <ul>
        {cart.map((cartItem) => (
          <li className="movies__cart-card" key={`card-item-${cartItem.id}`}>
            <ul>
              <li>ID: {cartItem.id}</li>
              <li>Name: {cartItem.name}</li>
              <li>Price: {formatCurrencyValue(cartItem.price)}</li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => decrementQuantity(cartItem)}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => incrementQuantity(cartItem)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Sub Total: {formatCurrencyValue(subTotal)}</p>
        <p>Discounts: {discount * 100}%</p>
        <p>Total: {formatCurrencyValue(total)}</p>
      </div>
    </div>
  );
};

export default Cart;
