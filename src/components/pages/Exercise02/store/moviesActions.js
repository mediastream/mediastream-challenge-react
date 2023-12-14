import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
} from "./moviesTypes";

export const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST });
export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});
export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchGenresRequest = () => ({ type: FETCH_GENRES_REQUEST });
export const fetchGenresSuccess = (genres) => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});
export const fetchGenresFailure = (error) => ({
  type: FETCH_GENRES_FAILURE,
  payload: error,
});
