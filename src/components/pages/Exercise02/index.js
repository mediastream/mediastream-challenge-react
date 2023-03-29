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
import { useState } from "react";
import { useMovie } from "./hooks/useMovie";
import { useGender } from "./hooks/useGender";
import { Card } from "./components/Card";
import { Loading } from "./components/Loading";
import { Filter } from "./components/Filter";

export default function Exercise02() {
  const [genderSelected, setGenderSelected] = useState("");
  const [yearOrder, setYearOrder] = useState("desc");

  const { movies, loading, fetchCount, handleMovieFetch } = useMovie(
    genderSelected,
    yearOrder
  );
  const { genders } = useGender();

  const updateMovies = (gender, order) => {
    handleMovieFetch(gender, order);
  };

  const updateGender = async (gender) => {
    await setGenderSelected(gender);
    await updateMovies(gender, yearOrder);
  };

  const updateYearOrder = () => {
    if (yearOrder === "asc") {
      setYearOrder("desc");
    } else {
      setYearOrder("asc");
    }
    updateMovies(genderSelected, yearOrder);
  };

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">Movie Library</h1>
      <Filter
        genders={genders}
        yearOrder={yearOrder}
        updateGender={updateGender}
        updateYearOrder={updateYearOrder}
      />
      {loading ? <Loading fetchCount={fetchCount} /> : <Card movies={movies} />}
    </section>
  );
}
