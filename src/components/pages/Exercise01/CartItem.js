export default function CartItem({ item, handleChangeQuantity }) {
  return (
    <li className="movies__cart-card">
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => handleChangeQuantity(0)}>{ item.quantity > 1 ? '-' : '🗑️'}</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleChangeQuantity(1)}>+</button>
      </div>
    </li>
  );
}
