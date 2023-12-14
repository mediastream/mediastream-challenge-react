import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_FAILURE,
} from "./moviesTypes";

const initialState = {
  movies: [],
  genres: [],
  loading: false,
  error: null,
  fetchCount: 0,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, fetchCount: state.fetchCount + 1 };

    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false };

    case FETCH_MOVIES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case FETCH_GENRES_REQUEST:
      return { ...state, loading: true };

    case FETCH_GENRES_SUCCESS:
      return { ...state, genres: action.payload, loading: false };

    case FETCH_GENRES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default moviesReducer;
