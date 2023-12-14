import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchGenresSuccess,
  fetchGenresFailure,
} from "./moviesActions";
import { getGenres, getMovies } from "../services/api";
import { FETCH_GENRES_REQUEST, FETCH_MOVIES_REQUEST } from "./moviesTypes";

function* fetchMoviesSaga() {
  try {
    const movies = yield call(getMovies);
    yield put(fetchMoviesSuccess(movies));
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}

function* fetchGenresSaga() {
  try {
    const genres = yield call(getGenres);
    yield put(fetchGenresSuccess(genres));
  } catch (error) {
    yield put(fetchGenresFailure(error.message));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES_REQUEST, fetchMoviesSaga);
}

export function* watchFetchGenres() {
  yield takeLatest(FETCH_GENRES_REQUEST, fetchGenresSaga);
}
