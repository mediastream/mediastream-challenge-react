import "../assets/styles.css";

const Card = (props) => {
  const { movie } = props;
  return (
    <div className="movie-library__card">
      <img
        src={movie.posterUrl}
        alt={movie.title}
      />
      <div className="moview-library__card-gradient"></div>
      <div className="moview-library__card-footer">
        <text className="card-footer-title">{movie.title}</text>
        <text>{movie.genres.join(", ")}</text>
        <text>{movie.year}</text>
      </div>
    </div>
  );
};

export default Card