import PropTypes from 'prop-types';
import './styles.css';

export default function LibraryActions({ genres }) {
  return (
    <div className="movie-library__actions">
      <select name="genre" placeholder="Search by genre...">
        {genres.map((gender) => <option value="genre1">{gender}</option>)}
      </select>
      <button>Order Descending</button>
    </div>
  )
}

LibraryActions.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string)
}

LibraryActions.defaultProps = {
  genres: []
}