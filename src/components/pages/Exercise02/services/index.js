import { getGenres, handleMovieFetch, getMoviesBygender } from "../API";

export const getInitialData = (order = "desc") => {
  return Promise.all([getGenres(), handleMovieFetch(order)]).then(
    ([genderList, moviesList]) => ({
      genderList,
      moviesList,
    })
  );
};

export const filterByGender = (gender, order = "desc") => {
  return getMoviesBygender(gender, order);
};
