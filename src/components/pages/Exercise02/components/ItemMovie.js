import React from 'react';

export default function ItemMovie({ movie }) {
  return (
    <div className='movie-library__card '>
      <img src={movie.posterUrl} alt={movie.title} />
      <div className='movie-library__background'>
        <div className='movie-library__detail'>
          <h3>{movie.title}</h3>
          <span>{movie.year}</span>
          <span>{movie.genres.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
