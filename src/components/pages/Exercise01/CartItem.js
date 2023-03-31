import "./assets/styles.css";
import QuantityControl from "./QuantityControl";

const CartItem = ({ movie, onDecrementQuantity, onIncrementQuantity }) => {
  return (
    <li className="movies__cart-card" key={movie.id}>
      <ul>
        <li> {movie.name}</li>
        <li>${movie.price}</li>
      </ul>
      <QuantityControl
        quantity={movie.quantity}
        onDecrement={onDecrementQuantity}
        onIncrement={onIncrementQuantity}
      />
    </li>
  );
};

export default CartItem;
