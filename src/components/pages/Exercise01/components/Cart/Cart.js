export const Cart = ({ movies, addMovieToCart }) => {
    return (
        <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li className="movies__list-card">
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
              <button onClick={() => addMovieToCart({ movie })}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
}