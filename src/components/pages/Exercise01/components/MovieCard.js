import "../assets/styles.css";

const Card = (props) => {
  const { movie, setMovieToCart, decrement, increment } = props;
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {movie.id}</li>
        <li>Name: {movie.name}</li>
        <li>Price: ${movie.price}</li>
      </ul>
      {setMovieToCart && <button onClick={setMovieToCart}>Add to cart</button>}
      {decrement && increment && (
        <div className="movies__cart-card-quantity">
          <button onClick={decrement}>-</button>
          <span className="movies__cart-card-quantity-number">{movie.quantity}</span>
          <button onClick={increment}>+</button>
        </div>
      )}
    </li>
  );
};

export default Card;
