import React from 'react'
import styles from './ShopItemsComponent.module.scss'

interface IProps {
  movies: any[]
  addToCartHandler: (movie: any) => void
}

const ShopItemsComponent: React.FunctionComponent<IProps> = ({
  movies,
  addToCartHandler,
}: IProps) => {
  return (
    <div className={styles.container}>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id} className={styles.card}>
            <ul>
              <li>ID: {movie.id}</li>
              <li>Name: {movie.name}</li>
              <li>Price: ${movie.price}</li>
            </ul>
            <button onClick={() => addToCartHandler(movie)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopItemsComponent
