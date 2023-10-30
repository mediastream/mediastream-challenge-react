export function cartReducer(movies, action) {
  switch (action.type) {
    case 'added': {
      const isMovieInCart = movies.find(movie => movie.id === action.movie.id)
      if (isMovieInCart) {
        return movies.map(movie => {
          if (movie.id === action.movie.id) {
            return { ...movie, quantity: movie.quantity + 1 }
          }
          return movie
        });
      } else {
        return [
          ...movies,
          { ...action.movie, quantity: 1 }
        ];
      }
    }
    case 'deleted': {
      return movies.filter(movie => movie.id !== action.movieId);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}