// rootReducer.js
import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import moviesReducer from "./moviesReducer";
import { watchFetchGenres, watchFetchMovies } from "./moviesSagas";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

function* rootSaga() {
  yield all([watchFetchMovies(), watchFetchGenres()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
