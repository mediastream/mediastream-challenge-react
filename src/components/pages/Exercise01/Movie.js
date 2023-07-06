const Movie = ({movie, onClickAddToCart}) => {
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {movie.id}</li>
        <li>Name: {movie.name}</li>
        <li>Price: ${movie.price}</li>
      </ul>
      <button onClick={() => onClickAddToCart(movie)}>Add to cart</button>
    </li>
  );
};

export default Movie;
