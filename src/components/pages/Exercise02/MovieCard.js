const MovieCard = ({ movie }) => {
  return (
    <div className="movie-library__card">
      <img src={movie.posterUrl} alt={movie.title} />
      <div className="moviei-library__card-gradient"></div>
      <div className="moviei-library__card-footer">
        <text className="card-footer-title">{movie.title}</text>
        <text>{movie.genres.join(", ")}</text>
        <text>{movie.year}</text>
      </div>
    </div>
  );
};

export default MovieCard;
