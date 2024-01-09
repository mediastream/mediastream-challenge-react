import CartCard from "../Cards/CartCard";
import "./styles.css";

export default function MoviesCart({ cart, onIncrement, onDecrement, getTotal }) {
  return (
    <div className="movies__cart">
      <ul>
        {cart.map(cartMovie => (
          <CartCard key={cartMovie.id} movie={cartMovie} onDecrement={onDecrement} onIncrement={onIncrement} />
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  );
}