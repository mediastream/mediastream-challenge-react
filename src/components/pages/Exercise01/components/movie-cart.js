import { useCartContext } from "../providers/cart"

export default function MovieList() {
    const { cart, subtotal, decrementQuantity, incrementQuantity, total } = useCartContext()
    //TODO: Create empty cart message
    return (
        <div className="movies__cart">
            <h1>Cart</h1>
            {
                cart.length === 0 && <p>Cart is empty</p>
            }
            {
                cart.length > 0 && (
                    <ul className="movies__cart-ul">
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
                )
            }
            <div className="movies__cart-total">
                {subtotal === 0 && <p>Total: ${total}</p>}
                {subtotal > 0 && <strike >Total: ${total}</strike>}
                {subtotal > 0 && <p>Offer: ${subtotal}</p>}
            </div>
        </div>
    )
}