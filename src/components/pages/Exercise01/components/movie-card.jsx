export default function MovieCard({
  movie,
  addToCart,
  updateAmount,
  isInCart = false,
}) {
  return (
    <div className="movie" key={movie.id}>
      <div className="movie-image">
        <img src={movie.image} alt={movie.name} />
      </div>
      <div className="movie-info">
        <p className="movie-name">{movie.name}</p>
        <p className="movie-price">Price: {movie.price}$</p>
        {!isInCart && (
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(movie.id)}
          >
            Add to cart
          </button>
        )}
        {isInCart && (
          <div className="amount">
            <button onClick={() => updateAmount(movie.id, -1)}> - </button>
            <p>{movie.amount}</p>
            <button onClick={() => updateAmount(movie.id, 1)}> + </button>
          </div>
        )}
      </div>
    </div>
  );
}
