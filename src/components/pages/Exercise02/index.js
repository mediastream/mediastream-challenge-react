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
import Card from "./components/Card";
import Search from "./components/Search";

export default function Exercise02 () {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState(null);
  const [orderSelected, setOrderSelected] = useState("desc");
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log('Getting movies');
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      })
  }

  useEffect(() => {
    if (genreSelected) {
      handleMovieFetch();
    }
  }, [genreSelected]);

  useEffect(() => {
    setMovies(movies.reverse());
  }, [orderSelected]);

  useEffect(() => {
    const handleGenreFetch =  () => {
      setLoading(true);
      fetch('http://localhost:3001/genres')
        .then(res => res.json())
        .then(json => {
          setGenres(json);
          setLoading(false);
        })
        .catch(() => {
          console.log('Run yarn movie-api for fake api');
        })
    };

    handleGenreFetch();
  }, [])

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <Search
        loading={loading}
        genres={genres}
        order={orderSelected}
        handleChangeGenre={(genre) => setGenreSelected(genre)}
        handleChangeOrder={() => setOrderSelected(orderSelected === "asc" ? "desc" : "asc")}
      />
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map((movie, index) => (
            <Card 
              movie={movie} 
              key={`card-${index}`}
            />
          ))}
        </ul>
      )}
    </section>
  )
}