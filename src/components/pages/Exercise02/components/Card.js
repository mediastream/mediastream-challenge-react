const Card = ({ movie }) => {
    return (
        <li key={movie.id} className="movie-library__card">
            <img src={movie.posterUrl} alt={`${movie.title} - ${movie.year}`} />
            <div className="movie-library__card__info">
                <ul>
                <li>{movie.title}</li>
                <li>{movie.genres.join(", ")}</li>
                <li>{movie.year}</li>
                </ul>
            </div>
        </li>
    );
}

export default Card;