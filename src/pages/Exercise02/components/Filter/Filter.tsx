import React from 'react';

interface Props {
  genders: string[];
  yearOrder: string;
  updateGender: (gender: any) => Promise<void>;
  updateYearOrder: () => void;
}

const Filter = ({ genders, yearOrder, updateGender, updateYearOrder }: Props) => {
  return (
    <div className="movie-library__actions">
      <select
        className="movie-filter"
        name="genre"
        placeholder="Search by genre..."
        onChange={(ev) => updateGender(ev.target.value)}
      >
        {genders &&
          genders.map((gender: any) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
      </select>
      <button className="movie-button" onClick={updateYearOrder}>
        Year {yearOrder === 'asc' ? 'Ascendeing' : 'Descending'}
      </button>
    </div>
  );
};

export default Filter;
