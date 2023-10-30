import PropTypes from 'prop-types';

export const MovieType = {
  id: PropTypes.number,
  title: PropTypes.string,
  year: PropTypes.string,
  runtime: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  posterUrl: PropTypes.string,
}