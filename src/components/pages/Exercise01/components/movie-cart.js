import { useCartContext } from "../providers/cart"

export default function MovieList() {
    const { cart, decrementQuantity, incrementQuantity, total } = useCartContext()

    return (
        <div className="movies__cart">
            <ul>
                {cart.map((item, index) => (
                    <li key={`${index}-${item.id}`} className="movies__cart-card">
                        <ul>
                            <li>
                                ID: {item.id}
                            </li>
                            <li>
                                Name: {item.name}
                            </li>
                            <li>
                                Price: ${item.price}
                            </li>
                        </ul>
                        <div className="movies__cart-card-quantity">
                            <button onClick={() => decrementQuantity(item)}>
                                -
                            </button>
                            <span>
                                {item.quantity}
                            </span>
                            <button onClick={() => incrementQuantity(item)}>
                                +
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="movies__cart-total">
                <p>Total: ${total}</p>
            </div>
        </div>
    )
}