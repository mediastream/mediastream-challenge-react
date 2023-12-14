import commingsoon from "../assets/commingsoon.jpg";

export const MovieCard = ({ movie }) => {
  return (
    <li className='movie-library__card'>
      <div className='movie-library__card-content'>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className='movie-library__card-img'
          onError={(e) => {
            e.target.src = commingsoon;
          }}
        />
        <div className='movie-library__card-text'>
          <p className='movie-library__card-title'>{movie.title}</p>
          <p className='movie-library__card-info'>
            <span> {movie.genres.join(", ")}</span>
            <span> {movie.year}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
