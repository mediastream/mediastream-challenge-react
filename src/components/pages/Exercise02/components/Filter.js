import React from "react";

export const Filter = ({
  genders,
  yearOrder,
  updateGender,
  updateYearOrder,
}) => {
  return (
    <div className="movie-library__actions">
      <select
        className="movie-filter"
        name="genre"
        placeholder="Search by genre..."
        onChange={(ev) => updateGender(ev.target.value)}
      >
        {genders &&
          genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
      </select>
      <button className="movie-button" onClick={updateYearOrder}>
        Year {yearOrder === "asc" ? "Ascendeing" : "Descending"}
      </button>
    </div>
  );
};
