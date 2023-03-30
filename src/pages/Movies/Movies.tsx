import styles from './movies.module.scss';
import MoviesProvider from './context';
import ListControl from './components/ListControl';
import MovieList from './components/MovieList';

const Movies = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Library</h1>
      <MoviesProvider>
        <ListControl />
        <MovieList />
      </MoviesProvider>
    </div>
  );
};

export default Movies;
