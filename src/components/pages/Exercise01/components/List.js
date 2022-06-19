function List(props) {
  const { movies, onAddCartClick } = props;

  return (
    <ul className="movies__list">
      {movies.map((movie) => (
        <li key={movie.id} className="movies__list-card">
          <ul>
            <li>ID: {movie.id}</li>
            <li>Name: {movie.name}</li>
            <li>Price: ${movie.price}</li>
          </ul>
          <button onClick={() => onAddCartClick(movie)}>Add to cart</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
