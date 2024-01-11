import { useCartContext } from "../providers/cart"
import { movies } from '../utils/movies'

export default function MovieList() {
    const { cart, addToCart } = useCartContext()

    return (
        <div className="movies__list">
            <h1>Movies List</h1>
            <ul className="movies__cart-ul">
                {movies.map(movie => (
                    <li key={movie.id} className="movies__list-card">
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
                        <button onClick={() => addToCart(movie)} disabled={cart.find(item => item.id === movie.id)}>
                            Add to cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}