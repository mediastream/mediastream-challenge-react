const CartItem = ({cartItem, decrementQuantity, incrementQuantity}) => {
  return (
    <li className="movies__cart-card">
      <ul>
        <li>ID: {cartItem.id}</li>
        <li>Name: {cartItem.name}</li>
        <li>Price: ${cartItem.price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => decrementQuantity(cartItem)}>-</button>
        <span>{cartItem.quantity}</span>
        <button onClick={() => incrementQuantity(cartItem)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
