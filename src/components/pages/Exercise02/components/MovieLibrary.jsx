function MovieLibrary({movies, loading, fetchCount}){
  console.log(loading)
  return !loading ? (
    <ul className="movie-library__list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-library__card">
          <img src={movie.posterUrl} alt={movie.title} />
          <ul>
            <li>ID: {movie.id}</li>
            <li>Title: {movie.title}</li>
            <li>Year: {movie.year}</li>
            <li>Runtime: {movie.runtime}</li>
            <li>Genres: {movie.genres.join(', ')}</li>
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    <div className="movie-library__loading">
      <p>Loading...</p>
      <p>Fetched {fetchCount} times</p>
    </div>
  )
}

export default MovieLibrary
