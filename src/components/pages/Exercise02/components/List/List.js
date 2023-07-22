export const List = ({ moviesShow, loading }) => {
    return (
        <ul className="movie-library__list">
            {loading ? (
            <div className="movie-library__loading">
              <p>Loading...</p>
            </div>
             ) : moviesShow.map(movie => (
            <li key={movie.id} className="movie-library__card">
                <img src={movie.posterUrl} alt={movie.title} />
                <ul>
                <li>{movie.title}</li>
                <li>{movie.genres.join(', ')}</li>
                <li>{movie.year}</li>                  
                </ul>
            </li>
            ))}
        </ul>
    )
}