/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css';
import { useState } from 'react';

import useRequest from './hooks/useRequest';

import Header from './components/Header';
import Movie from './components/Movie';

export default function Exercise02() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [fetchCount, setFetchCount] = useState(0);
  const { data: genres, loading: genresLoading } = useRequest('/genres');

  const getMovieUrl = () => {
    let moviePath = `/movies?_limit=50&_sort=year&_order=${order}&_page=${page}`;
    if (selectedGenre) {
      moviePath += `&genres_like=${selectedGenre}`;
    }

    return moviePath;
  };

  const { data: movies, loading: moviesLoading } = useRequest(getMovieUrl(), {
    pushToList: setPage > 1,
    onResponse: () => {
      setFetchCount((count) => count + 1);
    },
  });

  const handleOnGenderChange = (e) => {
    setSelectedGenre(e.target.value);
    setPage(1);
  };

  const handleOnOrderClick = () => {
    setOrder(order === 'desc' ? 'asc' : 'desc');
    setPage(1);
  };

  return (
    <section className="movie-library">
      <Header
        selectedGenre={selectedGenre}
        order={order}
        genres={genres}
        onGenderChange={handleOnGenderChange}
        onOrderClick={handleOnOrderClick}
      />
      {genresLoading || moviesLoading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie) => (
            <Movie movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}
