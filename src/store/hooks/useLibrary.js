import React, {useEffect, useState} from "react";
import { actionLibraryTypes as actionTypes } from "../actions";
import { libraryReducer } from "../reducers";

export function useLibrary({ reducer = libraryReducer } = {}) {
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');

    const [{ movies, genders }, dispatch] = React.useReducer(reducer, {
        movies: [],
        genders: [],
    });

    const setMovies = (movies) => dispatch({ type: actionTypes.setMovies, movies });
    const setGenders = (genders) => dispatch({ type: actionTypes.setGenders, genders });

    console.log({ movies, genders })

  const handleMovieFetch = React.useCallback(() => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
    fetch(`http://localhost:3001/movies?limit=50${gender ? '&genres_like=' + gender : ''}`)
        .then((res) => res.json())
        .then((json) => {
          setMovies(json);
          setLoading(false);
        })
        .catch(() => {
          console.log("Run yarn movie-api for fake api");
        });
  }, [gender]);

  useEffect(() => {
    handleMovieFetch();
  }, [gender, genders]);

    const handleGenderFetch = React.useCallback(() => {
        setLoading(true);
        fetch('http://localhost:3001/genres')
            .then((res) => res.json())
            .then((json) => {
                setGenders(json);
                setLoading(false);
            })
            .catch(() => {
                console.log("Run yarn movie-api for fake api");
            });
    }, []);

    useEffect(() => {
        handleGenderFetch();
    }, [handleGenderFetch]);

  return { movies, loading, fetchCount, gender, genders, setGender };
}
