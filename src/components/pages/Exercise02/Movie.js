const placeholder = require("./assets/placeholder.jpg");

const Movie = ({movie}) => {
  return (
    <li key={movie.id} className="movie-library__card">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = placeholder.default;
        }}
      />
      <ul>
        <li>{movie.title}</li>
        <li>{movie.year}</li>
        <li>{movie.genres.join(", ")}</li>
      </ul>
    </li>
  );
};

export default Movie;
