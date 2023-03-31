import React from 'react';
import { Movie } from 'models/movie';
import { useCart } from 'pages/Exercise01/context';
import '../../assets/styles.css';

const MovieItem = ({ data }: { data: Movie }) => {
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {data.id}</li>
        <li>Name: {data.name}</li>
        <li>Price: ${data.price}</li>
      </ul>
      <Button data={data} />
    </li>
  );
};
export default MovieItem;

const Button = ({ data }: { data: Movie }) => {
  const { addProduct } = useCart();

  const handleClick = () => {
    addProduct(data);
  };

  return (
    <button onClick={handleClick} type="button">
      Add to cart
    </button>
  );
};
