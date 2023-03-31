const List = ({ movie, decrementQuantity, incrementQuantity }) => {
    return (
        <li className="movies__cart-card">
            <ul>
                <li className="movie__band">
                    <h1 className="movie__title">{movie.name}</h1>
                    <p className="movie__price">Price: ${movie.price}</p>
                </li>
            </ul>
            <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(movie)}>-</button>
                <span> {movie.quantity} </span>
                <button onClick={() => incrementQuantity(movie)}>+</button>
            </div>
        </li>
    );
}

export default List;