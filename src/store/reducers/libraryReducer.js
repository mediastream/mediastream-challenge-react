import { actionLibraryTypes as actionTypes } from "../actions";

export function libraryReducer(state, action) {
  switch (action.type) {
    case actionTypes.setMovies: {
      return {
        movies: action.movies,
        genders: state.genders,
      };
    }
    case actionTypes.setGenders: {
      return {
        movies: state.movie,
        genders: action.genders,
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
