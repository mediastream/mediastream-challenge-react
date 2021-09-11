import React from "react"

const GenderSelector = ({ genres, handleChange }) => {
  return (
    <select
      onChange={handleChange}
      name="genre"
      style={{ width: "100%", padding: "1em" }}
      placeholder="Search by genre..."
    >
      {genres.map((genre) => {
        return (
          <option key={genre} value={genre}>
            {genre}
          </option>
        )
      })}
    </select>
  )
}

export default GenderSelector
