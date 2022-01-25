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
import headerImg from "./assets/mountains.jpeg";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isLoadingGenres, setIsLoadingGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGender, setSelectedGender] = useState("all");

  const [orderMovie, setOrderMovie] = useState("descending");

  const handleMovieFetch = (url) => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const getGenresFetch = () => {
    setIsLoadingGenres(true);
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setIsLoadingGenres(false);
      })
      .catch(() => {
        setIsLoadingGenres(false);
        console.log("Run yarn movie-api for fake api");
      });
  };

  const handleClickToggleOrder = () => {
    const order = orderMovie === "descending" ? "asending" : "descending";
    setOrderMovie(order);
  };

  useEffect(() => {
    handleMovieFetch("http://localhost:3001/movies?_limit=50");
    getGenresFetch();
  }, []);

  const handleChanceGender = (gender) => {
    const urlgenres = gender === "all" ? "" : `?_genres=${gender}`;
    handleMovieFetch(`http://localhost:3001/movies${urlgenres}`);
  }

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <img src={headerImg} />
        <h1 className="movie-library__title">Movie Library</h1>
        {isLoadingGenres ? (
          <p>loading...</p>
        ) : (
          <div className="movie-library__actions">
            <select
              name="genre"
              placeholder="Search by genre..."
              value={selectedGender}
              onChange={(e) => {
                const gender = e.target.value;
                setSelectedGender(gender)
                handleChanceGender(gender);
              }}
            >
              <option value="all">all</option>
              {genres.map((gender, index) => {
                return <option value={gender} key={index}>{gender}</option>;
              })}
            </select>
            <button onClick={handleClickToggleOrder}>
              {orderMovie === "descending" ? (
                <span>Year Asending</span>
              ) : (
                <span>Year Descending</span>
              )}
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies
            .filter((movie) =>
              movie.genres.some((gender) => {
                if (selectedGender === "all") {
                  return true;
                }
                return gender === selectedGender;
              })
            )
            .sort((prevMovie, currentMovie) => {
              if (orderMovie === "asending") {
                return prevMovie.year - currentMovie.year;
              }
              return currentMovie.year - prevMovie.year;
            })
            .map((movie) => (
              <li key={movie.id} className="movie-library__card">
                <img src={movie.posterUrl} alt={movie.title} />
                <ul>
                  <li className="title">Title: {movie.title}</li>
                  <li>Genres: {movie.genres.join(", ")}</li>
                  <li>Year: {movie.year}</li>
                </ul>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
