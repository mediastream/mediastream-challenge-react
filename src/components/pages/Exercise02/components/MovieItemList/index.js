export const MovieItemList = (props) => {
  const { movie } = props;
  return (
    <li key={movie.id} className="movie-library__card">
      <div
        className="movie-library__card_container"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          background: `linear-gradient(to bottom, rgba(2,0,36,1), transparent, transparent, rgba(87, 121, 7, 0.7)), url('${movie.posterUrl}')`,
        }}
      >
        <ul>
          <li data-testid="movie-title">{movie.title}</li>
          <li data-testid="movie-genres">{movie.genres.join(", ")}</li>
          <li data-testid="movie-year">{movie.year}</li>
        </ul>
      </div>
    </li>
  );
};
