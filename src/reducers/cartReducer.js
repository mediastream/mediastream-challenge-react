export function cartReducer(movies, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...movies,
        { ...action.movie }
      ];
    }
    case 'deleted': {
      return movies.filter(movie => movie.id !== action.movie.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}