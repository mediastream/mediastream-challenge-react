import PropTypes from 'prop-types';
import './styles.css';

export default function LibraryActions({ genres, filters }) {
  const order = filters.order || 'asc'

  const handleSelectGender = (e) => {
    const value = e.target.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('genres', value);
    window.location.search = urlParams;
  }

  const handleOrderList = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('order', order === "asc" ? "desc" : "asc");
    window.location.search = urlParams;
  }

  return (
    <div className="movie-library__actions">
      <select name="genre" placeholder="Search by genre..." onChange={handleSelectGender} value={filters.genres}>
        {genres.map((gender) => <option key={gender} value={gender}>{gender}</option>)}
      </select>
      <button onClick={handleOrderList}>Year {order === "asc" ? "Descending" : "Ascending"}</button>
    </div>
  )
}

LibraryActions.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.object
}

LibraryActions.defaultProps = {
  genres: [],
  filters: {}
}