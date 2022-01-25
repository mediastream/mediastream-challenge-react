import { createContext, useContext } from "react";

export const MovieLibraryContext = createContext({
  movies: {
    list: [],
    loading: false,
  },
  genres: {
    list: [],
    loading: false,
  },
  filters: {
    selectedGenre: {
      value: "",
      setSelectedGenre: () => {},
    },
    order: {
      value: "",
      setOrder: () => {},
    },
  },
});

export const MovieLibraryProvider = MovieLibraryContext.Provider;

export const useMovieLibraryContext = () => useContext(MovieLibraryContext);
