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
import background from "./assets/mountains.jpeg";

const URL_MOVIES = 'http://localhost:3001/movies?_limit=50';
const URL_GENDERS = 'http://localhost:3001/genres';

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [genders, setGenders] = useState(['All']);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingGender, setLoadingGender] = useState(false);
  const [yearOrder, setYearOrder] = useState('Descending')

  const handleMovieFetch = () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log('Getting movies');
    fetch(URL_MOVIES)
      .then(res => res.json())
      .then(json => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api');
      })
  }

  const handleGenderFetch = () => {
    setLoadingGender(true);
    fetch(URL_GENDERS)
      .then(res => res.json())
      .then(json => {
        setGenders([
          ...genders,
          ...json
        ]);
        setLoadingGender(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    handleMovieFetch();
    handleGenderFetch();
  }, []);

  const handlerChangeGender = (e) => {
    const gender = e.target.value;
    if (gender === 'All') handleMovieFetch();
    else {
      setLoading(true);
      setFetchCount(fetchCount + 1);
      console.log(`Getting movies by gender ${gender}`);
      fetch(URL_MOVIES)
        .then(res => res.json())
        .then(json => {
          const filtered = json.filter(movie => movie.genres.includes(gender))
          setMovies(filtered);
          setLoading(false);
        })
        .catch(() => {
          console.log('Run yarn movie-api for fake api');
        })
    }
  }

  const handlerOrderByYear = () => {
    if (yearOrder === 'Descending') {
      setYearOrder('Ascending');
      const aux = Array.from(movies);
      aux.sort(function (a, b) {
        return a.year - b.year;
      });
      setMovies(aux);
    } else {
      setYearOrder('Descending');
      const aux = Array.from(movies);
      aux.sort(function (a, b) {
        return b.year - a.year;
      });
      setMovies(aux);
    }
  }


  return (
    <section className="movie-library" >
      <div className="movie-library__head">
        <h1 className="movie-library__title">
          Movie Library
        </h1>
        <div className="movie-library__actions">
          {loadingGender ? (
            <select name="genre" placeholder="Search by genre..." >
              <option value="genre1">wait...</option>
            </select>
          ) : (
            <select name="genre" placeholder="Search by genre..." onChange={handlerChangeGender}>
              {genders.map((gender, i) => (<option key={i} value={gender}>{gender}</option>)
              )}
            </select>
          )}

          <button onClick={handlerOrderByYear}>Year {yearOrder}</button>
        </div>
      </div>


      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {movies.map(movie => (
            <li key={movie.id} className="movie-library__card"
              style={{
                background: `linear-gradient(to bottom, rgba(255, 255, 255,0) 30%,
              rgba(250, 246, 7,0.9)) , url(${movie.posterUrl})center`,
              backgroundSize: 'cover',
              }}

            >

              <ul>
                <li>{movie.title}</li>
                <li>{movie.genres.join(', ')}</li>
                <li>{movie.year}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

//style={{ backgroundImage: `url(${background})` }}