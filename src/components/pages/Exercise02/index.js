/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from 'react';
import { getGeneres } from '../../../utils/fetch';
import ItemMovie from './components/ItemMovie';

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [genres, setGenres] = useState({
    genresList: [],
    genresSelect: ''
  });

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch('http://localhost:3001/movies?_limit=50')
      .then((res) => res.json())
      .then((json) => {
        if (genres.genresSelect) {
          const items = json;
          const filter = items.filter((i) => {
            if (i.genres.includes(genres.genresSelect)) {
              return i;
            }
          });
          setMovies(filter);
        } else {
          setMovies(json);
        }
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      });
  };

  useEffect(() => {
    handleMovieFetch();
    getGeneres().then((res) => {
      if (res.length) {
        setGenres((i) => ({ ...i, genresList: res }));
      }
    });
  }, [genres.genresSelect]);

  const handleSelectGender = (e) => {
    setGenres((i) => ({ ...i, genresSelect: e }));
  };

  const handlerSort = () => {
    setSort((e) => !e);

    if (sort) {
      const sortMovies = movies.sort((a, b) => a.year - b.year);
      setMovies(sortMovies);
    } else{
      const sortMovies = movies.sort((a, b) => b.year - a.year);
      setMovies(sortMovies);
    }
  };

  return (
    <section className='movie-library'>
      <h1 className='movie-library__title'>Movie Library</h1>
      <div className='movie-library__actions'>
        <select
          name='genre'
          onChange={(event) => handleSelectGender(event.target.value)}
          placeholder='Search by genre...'
          value={genres.genresSelect}
        >
          {genres.genresList.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {!sort ? (
          <button onClick={handlerSort}>Year Ascending</button>
        ) : (
          <button onClick={handlerSort}>Year Descending</button>
        )}
      </div>
      {loading ? (
        <div className='movie-library__loading'>
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <div className='movie-library__list'>
          {movies.map((movie) => (
            <ItemMovie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
