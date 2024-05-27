import React from 'react'
import MovieCard from './MovieCard'
import "./assets/styles.css";

const Movies = ({movies, loading, fetchCount, initialPage, finalPage}) => {

  return (
    <section className=".movie-library">
     {loading ? (
       <div className="movie-library__loading">
         <p>Loading...</p>
         <p>Fetched {fetchCount} times</p>
       </div>
     ) : ( 
       <div className="movie-library__list">
         {movies?.slice(initialPage, finalPage).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
         ))}
       </div>
     )}
   </section>
  )
}

export default Movies