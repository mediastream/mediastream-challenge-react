import PropTypes from 'prop-types';

export const MovieType = {
  id: PropTypes.number,
  title: PropTypes.string,
  year: PropTypes.number,
  runtime: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  posterUrl: PropTypes.string,
}