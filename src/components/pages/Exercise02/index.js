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

import "./assets/styles.css";
import { useEffect, useState } from "react";

import { Loading } from "./components/Loading";
import { MovieLibraryActions } from "./components/MovieLibraryActions";
import { MovieLibraryList } from "./components/MovieLibraryList";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [moviesSort, setMoviesSort] = useState([]);
  const [genres, setGenres] = useState([]);
  const [invert, setInvert] = useState(false);
  const [AllMovies, setAllMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)


  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setAllMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const handleGenderFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting genders')
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenres(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    handleMovieFetch();
    handleGenderFetch();
  }, []);

  useEffect(() => {
    handleSortMovie();
  }, [movies]);


  const onChangeGenres = (gender) => {
    setLoading(true);
    setMovies(AllMovies.filter(movie => movie.genres.includes(gender)));
    setLoading(false);
  }

  const handleSortMovie = () => {
    setLoading(true);
    const sorted = (invert) ? movies.sort((a, b) => parseFloat(a.year) - parseFloat(b.year))
      : movies.sort((a, b) => parseFloat(b.year) - parseFloat(a.year))

    setInvert(!invert)
    setMoviesSort(sorted);
    setLoading(false);

  }

  return (
    <section className="movie-library">
      <div className="movie-library__title">
        <h1>
          Movie Library
        </h1>
        <MovieLibraryActions
          genres={genres}
          onChangeGenres={onChangeGenres}
          handleSortMovie={handleSortMovie}
          invert={invert}
        />
      </div>
      {loading ? (
        <Loading fetchCount={fetchCount} />
      ) : (
        <ul className="movie-library__list">
          {
            (moviesSort.map(movie => (
              <MovieLibraryList movie={movie} />
            )))
          }
        </ul>
      )}
    </section>
  )
}