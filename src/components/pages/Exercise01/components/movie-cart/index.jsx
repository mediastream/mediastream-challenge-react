import CartTotal from '../cart-total'
import MovieCard from '../movie-card'

const MovieCart = ({ cart, addCart, removeCart, total, totalWithDiscount }) => {
    return (<div className="movies__cart">
        <ul>
            {cart.map(x => (
                <MovieCard movie={x} key={x.id} addCart={addCart} removeCart={removeCart} type="cart" />
            ))}
        </ul>
        <CartTotal total={total} totalWithDiscount={totalWithDiscount} />
    </div>)
}

export default MovieCart
