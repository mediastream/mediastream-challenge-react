import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenresRequest } from "../store/moviesActions";

const MovieLibraryAction = ({
  selectedGenre,
  setSelectedGenre,
  ascendingOrder,
  setAscendingOrder,
}) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies.genres);

  useEffect(() => {
    dispatch(fetchGenresRequest());
  }, [dispatch]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleOrderToggle = () => {
    setAscendingOrder((prev) => !prev);
  };

  return (
    <div className='movie-library__actions-container'>
      <h1 className='movie-library__title'>Movie Library</h1>
      <div className='movie-library__actions'>
        <select
          name='genre'
          placeholder='Search by genre...'
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value=''>All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={handleOrderToggle}>
          {ascendingOrder ? "Year Descending" : "Year Ascending"}
        </button>
      </div>
    </div>
  );
};

export default MovieLibraryAction;
