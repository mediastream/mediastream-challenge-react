import React from 'react'
import MovieItemComponent from '../MovieItem/MovieItemComponent'
import styles from './MoviesListComponent.module.scss'

interface IProps {
  movies?: any[]
  loading: boolean
  fetchCount: number
}

const MoviesListComponent: React.FunctionComponent<IProps> = ({
  movies,
  loading,
  fetchCount,
}: IProps) => {
  return loading ? (
    <div className={styles.loading}>
      <p>Loading...</p>
      <p>Fetched {fetchCount} times</p>
    </div>
  ) : (
    <ul className={styles.list}>
      {movies?.map(movie => (
        <MovieItemComponent key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

MoviesListComponent.defaultProps = {
  movies: [],
}

export default MoviesListComponent
