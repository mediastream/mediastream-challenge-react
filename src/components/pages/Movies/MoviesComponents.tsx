import React from 'react'
import { useMovies } from '../../../hooks/useMovies'
import banner from './assets/mountains.jpeg'
import MoviesListComponent from './components/MoviesList/MoviesListComponent'
import SearchComponent from './components/Search/SearchComponent'
import styles from './MoviesComponents.module.scss'

const MoviesComponents: React.FunctionComponent = () => {
  const { genres, movies, fetchCount, order, setSelectedGenre, toggleOrder, loading } = useMovies()

  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
      </div>

      <div className={styles.movieContainer}>
        <h1>MediaSteam Movies</h1>
        <SearchComponent
          genres={genres}
          order={order}
          onChangeGenre={setSelectedGenre}
          onChangeOrder={toggleOrder}
        />
        <MoviesListComponent movies={movies} fetchCount={fetchCount} loading={loading} />
      </div>
    </section>
  )
}

export default MoviesComponents
