import './styles.css';

export default function Card({ movie }) {
  const httpsPath = movie.posterUrl.replace("http://", "https://");
  const fallBackPath = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";

  const styledBackground = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, var(--ms-green)), url(${httpsPath}), url(${fallBackPath})`;

  return (
    <li className="movie-library__card" style={{ backgroundImage: styledBackground, fallBackPath }}>
      <ul>
        <li><span className="movie-library__card__title">{movie.title}</span></li>
        <li>{movie.genres.join(', ')}</li>
        <li>{movie.year}</li>
      </ul>
    </li>
  );
}