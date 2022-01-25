import { useCallback, useMemo } from "react";

import { useMovieLibraryContext } from "../../context/MovieLibraryContext";
import { ORDER_LIST } from "../../constants";

import "./styles.css";

const Filters = () => {
  const {
    genres: { list: listGenres },
    filters: {
      selectedGenre: { value: selectedGenreVal, setSelectedGenre },
      order: { value: orderVal, setOrder },
    },
  } = useMovieLibraryContext();

  const handleChangeGenre = useCallback(
    (event) => {
      event.preventDefault();

      const currentVal = event.currentTarget
        ? event.currentTarget.value
        : event.target.value;

      setSelectedGenre(currentVal);
    },
    [setSelectedGenre]
  );

  const handleChangeOrder = useCallback(
    (event) => {
      event.preventDefault();

      setOrder((prevOrder) =>
        prevOrder === ORDER_LIST.ASC.value
          ? ORDER_LIST.DESC.value
          : ORDER_LIST.ASC.value
      );
    },
    [setOrder]
  );

  const orderButtonText = useMemo(
    () =>
      orderVal === ORDER_LIST.ASC.value
        ? ORDER_LIST.DESC.text
        : ORDER_LIST.ASC.text,
    [orderVal]
  );

  return (
    <div className="movie-library__actions">
      <div className="movie-library__actions__select">
        <select
          name="genre"
          placeholder="Search by genre..."
          value={selectedGenreVal}
          onChange={handleChangeGenre}
        >
          <option value="">All</option>
          {listGenres.map((gen) => (
            <option key={gen} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleChangeOrder}
        className="movie-library__actions__button"
      >
        {orderButtonText}
      </button>
    </div>
  );
};

export default Filters;
