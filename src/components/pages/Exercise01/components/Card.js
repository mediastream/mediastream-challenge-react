const Card = ({ movie, children }) => {
    return (
        <li className="movies__list-card">
            <ul>
                <li className="movie__information">
                    <h1 className="movie__title">{movie.name}</h1>
                    <p className="movie__body">{movie.synopsis}</p>
                    <p className="movie__price">Price: ${movie.price}</p>
                </li>
            </ul>
            <div className="movie__card-footer">
                { children }
            </div>
        </li>
    );
}

export default Card;