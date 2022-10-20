import { Movie } from '../../interfaces';

interface Props {
  movie: Movie;
}
const MovieCardComponent = ({ movie }: Props) => {
  return (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li style={{fontWeight: "bold"}}>{movie.title}</li>
                <li>{movie.genres.join(', ')}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          )
}
export default MovieCardComponent