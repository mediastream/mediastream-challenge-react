import React, { useState, useEffect } from 'react'

import useGenre from '../hooks/useGenre'
import { getStringifyMovieFilter } from '../useCases/filterMovie'

const MovieFilter = ({ setFilterQuery }) => {
  const { genres, areGenresLoading } = useGenre()
  const [selectedGenre, setSelectedGenre] = useState('')
  const [isDescending, setIsDescending] = useState(false)

  const handleOnSelectGenre = (event) => {
    const { target: { value } } = event
    setSelectedGenre(value)
  }

  const handleOrderClick = () => setIsDescending(prev => !prev)

  useEffect(() => {
    const movieFilter = getStringifyMovieFilter(selectedGenre, isDescending)

     setFilterQuery(movieFilter)
  }, [selectedGenre, isDescending, setFilterQuery]);

  return (
    <div className="movie-library__actions">
      <select name="genre" placeholder="Search by genre..." value={selectedGenre} onChange={handleOnSelectGenre}>
        {areGenresLoading && <option>Loading...</option>}
        {Boolean(genres.length > 0) &&
          <>
            <option value={0}>Search By Genre</option>
            {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </>
        }
      </select>
      <button onClick={handleOrderClick}>
        {isDescending ? 'Year Descending' : 'Year Ascending'}
      </button>
    </div>
  )
}

export default MovieFilter
