const MovieCard = ({movie}) => {
    return  (
        <div key={movie.id} className="movie-library__card">
            <img src={movie.posterUrl} alt={movie.title} className={'movie-library__cover'}/>
            <div className="movie-library__info">
                <h4 className="movie-library__title">{movie.title}</h4>
                <p className="movie-library__genre">{movie.genres.join(', ')} min</p>
                <p className="movie-library__year">{movie.year}</p>
            </div>
        </div>
    )
}

export default MovieCard;