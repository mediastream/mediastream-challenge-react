import React from 'react';

export const MovieLibraryList = ({ movie }) => {
    return (
        <li key={movie.id} className="movie-library__card">
            <div className="movie-library__card-container">
                <img src={movie.posterUrl} alt={movie.title} />
                <ul className="movie-library__card-text">
                    <li className="movie-library__card-title">{movie.title}</li>
                    <li className="movie-library__card-desc"> {movie.genres.join(', ')}</li>
                    <li className="movie-library__card-desc">{movie.year}</li>
                </ul>

            </div>
        </li>
    )
}
