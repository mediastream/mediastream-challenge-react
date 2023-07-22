export const Movies = ({ cart, totalPrice, decrement, increment }) => {
    return (
        <div className="movies__cart">
        <ul>
          {cart.length ? cart.map(movie => (
            <li className="movies__cart-card">
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
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrement({ id: movie.id })}>
                  -
                </button>
                <span>
                  {movie.quantity}
                </span>
                <button onClick={() => increment({ id: movie.id })}>
                  +
                </button>
              </div>
            </li>
          )) : <p className="no-movie">There no movies in the cart!</p>}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${totalPrice}</p>
        </div>
      </div>
    )
}