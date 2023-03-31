import "./assets/styles.css";

const QuantityControl = ({ quantity, onDecrement, onIncrement }) => {
  return (
    <div className="movies__cart-card-quantity">
      <button onClick={onDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
};

export default QuantityControl;
