import React from 'react';

export const CartMovies = ({ x, handleIncrement, handleDecrement, handleDelete }) => {
    return (
        <li className="movies__cart-card">
            <ul>
                <li>
                    ID: {x.id}
                </li>
                <li>
                    Name: {x.name}
                </li>
                <li>
                    Price: ${x.price}
                </li>
            </ul>
            <div className="movies__cart-card-quantity">
                <button onClick={() => {
                    (x.quantity === 1) ? handleDelete(x.id) : handleDecrement(x.id)
                    }}>
                    -
                </button>
                <span>
                    {x.quantity}
                </span>
                <button onClick={() => handleIncrement(x.id)}>
                    +
                </button>
            </div>
        </li>
    )
}
