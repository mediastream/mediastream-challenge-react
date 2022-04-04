import React from 'react'

export const MovieLibraryActions = ({ genres, onChangeGenres, handleSortMovie, invert }) => {
    return (
        <div className="movie-library__actions">
            <select
                onChange={({ target }) => onChangeGenres(target.value)}
                name="genre"
                placeholder="Search by genre...">
                {
                    genres.map(gender => (
                        <option value={gender}> {gender} </option>
                    ))
                }
            </select>
            <button className="btn-green"
                onClick={handleSortMovie}>
                {(invert) ? 'Year Descending' : 'Year Ascending'}
            </button>
        </div>
    )
}
