import styles from './movie-list.module.scss';
import { memo } from 'react';
import { useMovies } from 'pages/Movies/context';
import type { Movie } from 'types/movies';

const MovieList = () => {
  const { movies } = useMovies();

  return (
    <section className={styles.container}>
      <ul>
        {movies.map((movie) => (
          <Item data={movie} key={movie.id} />
        ))}
      </ul>
    </section>
  );
};

export default MovieList;

const Item = memo(({ data }: { data: Movie }) => {
  return (
    <li className={styles.item}>
      <img src={data.posterUrl} alt={data.title} />
      <div className={styles.overlay}>
        <h1>{data.title}</h1>
        <p>{data.genres.join(', ')}</p>
        <p>{data.year}</p>
      </div>
    </li>
  );
});
