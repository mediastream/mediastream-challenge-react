export const CartItemList = (props) => {
  const { movie, onDecrement, onIncrement } = props;
  return (
    <li className="movies__cart-card" data-testid="cart-item">
      <ul>
        <li data-testid="movie-id">ID: {movie.id}</li>
        <li data-testid="movie-name">Name: {movie.name}</li>
        <li data-testid="movie-price">Price: ${movie.price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button data-testid="decrement-button" onClick={() => onDecrement(movie)}>-</button>
        <span>{movie.quantity}</span>
        <button data-testid="increment-button" onClick={() => onIncrement(movie)}>+</button>
      </div>
    </li>
  );
};
