export default function Listing({ movies }) {

    return (
        <ul className="movie-library__list">
            {movies.map(movie => (
                <li key={movie.id} className="movie-library__card">
                    <img src={movie.posterUrl} alt={movie.title} />
                    <ul className="movie-library__description">
                        <li>Title: {movie.title}</li>
                        <li>Genres: {movie.genres.join(', ')}</li>
                        <li>Year: {movie.year}</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}
