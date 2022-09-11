import React from "react";
import { useCart } from "react-use-cart";

const ItemsCart = ({
    id,
    name,
    price,
    item
}) => {
  const { addItem } = useCart();
  return (
    <li key={id} className="movies__list-card">
        <ul>
            <li>
                ID: {id}
            </li>
            <li>
                Name: {name}
            </li>
            <li>
                Price: ${price}
            </li>
        </ul>
        <button onClick={() => addItem(item)}>
            Add to cart
        </button>
    </li>
  );
};

export default ItemsCart;