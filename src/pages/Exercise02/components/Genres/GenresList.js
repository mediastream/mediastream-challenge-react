import React, { useEffect, useRef } from "react";

function GenresList({
  setCurrentGenre,
  handleChangeMoviesOrder,
  orderMovies,
  genres,
}) {
  const genresRef = useRef(genres);

  useEffect(() => {
    genresRef.current = genres;
  });

  const handleChangeGenre = (newGenre) => {
    setCurrentGenre(newGenre);
  };

  return (
    <div className="movie-library__actions">
      {genres && (
        <select
          className="genre-select"
          onChange={(e) => handleChangeGenre(e.target.value)}
          name="genre"
          placeholder="Search by genre..."
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      )}
      <button
        className="genre-button__order"
        onClick={() => handleChangeMoviesOrder()}
      >{`Year ${orderMovies}`}</button>
    </div>
  );
}

export default GenresList;
