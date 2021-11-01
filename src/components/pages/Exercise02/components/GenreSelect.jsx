import PropTypes from 'prop-types'

function GenreSelect({genres, handleFilter}){
  return(
    <select name="genre" placeholder="Search by genre..." onChange={handleFilter} className="roundRadius">
      {genres.map(item => <option value={item}>{item}</option>)}
    </select>
  )
}

GenreSelect.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  handleFilter: PropTypes.func
}

export default GenreSelect
