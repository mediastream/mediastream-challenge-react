import { Movie } from '../../interfaces';
import MovieCardComponent from '../MovieCardComponent';

interface Props {
  loading: boolean;
  fetchCount: number;
  movies: Movie[];
}
const MovieListComponent = ({ loading, fetchCount, movies }: Props) => {
  return (
    <section className={""}>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map(movie => (
            <MovieCardComponent movie={movie} />
          ))}
        </ul>
      )}
    </section>
  )
}
export default MovieListComponent;