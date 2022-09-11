import { useCart } from "react-use-cart";

const Cart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();

    if (isEmpty) return <h1 className="text-center"> Your cart is Empty </h1>;
    
    return (
        <div className="movies__cart">
        <h3>Cart ({totalUniqueItems}) total Item :({totalItems})</h3>
        <ul>
            {items.map((item) => {
                return (
                    <li key={item.id} className="movies__cart-card">
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
                            <li>
                                Quantity: {item.quantity}
                            </li>
                        </ul>
                        <div className="movies__cart-card-quantity">
                            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                                -
                            </button>
                            <span>
                                {item.quantity}
                            </span>
                            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                +
                            </button>
                        </div>
                        <div className="movies__cart-card-removeItem">
                            <button onClick={() => removeItem(item.id)}>
                                remove item
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
            <div className="movies__cart-total">
                <p>Total: ${cartTotal}USD</p>
            </div>
        </div>
        
    );
};

export default Cart;