const MovieCard = ({ movie, addCart, removeCart, type }) => {
    return (<li className={type === 'catalog' ? 'movies__list-card' : 'movies__cart-card'}>
        <ul>
            <li>
                ID: {movie.id}
            </li>
            <li>
                Name: {movie.name}
            </li>
            <li>
                Price: ${movie.price}
            </li>
        </ul>
        {type === 'catalog' && <button data-testid="button-add-cart" onClick={() => addCart(movie)}>Add to Cart</button>}
        {type === 'cart' && (<div className="movies__cart-card-quantity">
            <button data-testid="button-remove-cart" onClick={() => removeCart(movie)}>-</button>
            <span>{movie.quantity}</span>
            <button data-testid="button-add-cart" onClick={() => addCart(movie)}>+</button>
        </div>)}
    </li>)
}

export default MovieCard
