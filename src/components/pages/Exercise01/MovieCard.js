import "./assets/styles.css";

const MovieCard = ({ movie, onAddToCart }) => {
  return (
    <li className="movies__list-card" key={movie.id}>
      <ul>
        <li> {movie.name}</li>
        <li> ${movie.price}</li>
      </ul>
      <button className="button" onClick={onAddToCart}>
        Add to cart
      </button>
    </li>
  );
};

export default MovieCard;
