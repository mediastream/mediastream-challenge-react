import { useCartContext } from "../../context/CartContext";

import { formatCurrencyValue } from '../../utils'

import "./styles.css";

const MovieList = ({ movies }) => {
  const { addToCard } = useCartContext();

  return (
    <div className="movies__list">
      <ul>
        {movies.map((movieItem) => (
          <li className="movies__list-card" key={`movie-item-${movieItem.id}`}>
            <ul>
              <li>ID: {movieItem.d}</li>
              <li>Name: {movieItem.name}</li>
              <li>Price: {formatCurrencyValue(movieItem.price)}</li>
            </ul>
            <button onClick={() => addToCard(movieItem)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
