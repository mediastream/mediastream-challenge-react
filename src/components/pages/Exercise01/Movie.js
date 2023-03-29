export default function Movie({ item, handleAdd }) {
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      <button onClick={handleAdd}>Add to cart</button>
    </li>
  );
}
