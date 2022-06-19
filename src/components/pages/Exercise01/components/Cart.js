function Cart(props) {
  const { cart, total, onIncrementDecrementClick } = props;

  return (
    <div className="movies__cart">
      <ul>
        {cart.map((cartMovie) => (
          <li key={cartMovie.id} className="movies__cart-card">
            <ul>
              <li>ID: {cartMovie.id}</li>
              <li>Name: {cartMovie.name}</li>
              <li>Price: ${cartMovie.price}</li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => onIncrementDecrementClick(-1, cartMovie.id)}>-</button>
              <span>{cartMovie.quantity}</span>
              <button onClick={() => onIncrementDecrementClick(1, cartMovie.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${total}</p>
      </div>
    </div>
  );
}

export default Cart;
