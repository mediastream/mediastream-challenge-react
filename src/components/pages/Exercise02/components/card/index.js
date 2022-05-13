import fallbackImg from '../../assets/fallback.png'

const Card = ({ movie }) => {
    return (
        <article className="movie-library__card">
            <div className="movie-library__card__body">
                <img src={movie.posterUrl} alt={movie.title} onError={(e) => { e.target.src = fallbackImg }} />
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.genres.join(', ')}</p>
                    <p>{movie.year}</p>
                </div>
            </div>
        </article>
    )
}

export default Card
