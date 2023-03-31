import React from 'react';
import { Item } from 'types/Items';

interface Props {
  movies: Item[];
}

const Card = ({ movies }: Props) => {
  return (
    <ul className="movie-library__list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-library__card">
          <img src={movie.posterUrl} alt={movie.title} />
          <div className="movie-library_text">
            <ul>
              <li className="movie-library_title">{movie.title}</li>
              <li className="movie-library_genders">{movie.genres.join(', ')}</li>
              <li className="movie-library_year">{movie.year}</li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Card;
