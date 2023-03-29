export const MovieItemList = (props) => {
    const { movie, addToCart } = props;
    return (
      <li className="movies__list-card" data-testid="movie-item">
        <ul>
          <li data-testid="movie-id">ID: {movie.id}</li>
          <li data-testid="movie-name">Name: {movie.name}</li>
          <li data-testid="movie-price">Price: ${movie.price}</li>
        </ul>
        <button data-testid={`add-to-cart-${movie.id}`} onClick={() => addToCart(movie)}>Add to cart</button>
      </li>
    );
  };
  