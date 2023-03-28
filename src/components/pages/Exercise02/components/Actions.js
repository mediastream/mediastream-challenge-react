import React, { memo } from "react";

const SORTS = {
  asc: "Ascending",
  desc: "Descending",
};

const Actions = ({
  genres = [],
  selectedGenre,
  setSelectedGenre,
  toggleOrder,
  order,
}) => (
  <div className="movie-library__actions">
    <select
      name="genre"
      value={selectedGenre}
      placeholder="Search by genre..."
      onChange={(e) => setSelectedGenre(e.target.value)}
    >
      {genres.map((gen) => (
        <option key={gen} value={gen}>
          {gen}
        </option>
      ))}
    </select>

    <button onClick={() => toggleOrder()}>Year {SORTS[order]}</button>
  </div>
);

export default memo(Actions);
