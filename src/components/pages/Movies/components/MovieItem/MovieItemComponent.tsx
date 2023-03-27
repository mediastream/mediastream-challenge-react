import React from 'react'
import styles from './MovieItemComponent.module.scss'

interface IProps {
  movie: any
}

const MovieItemComponent: React.FunctionComponent<IProps> = ({ movie }: IProps) => {
  return (
    <li className={styles.card}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        onError={(e: any) => {
          e.target.onerror = null
          e.target.src = 'https://placehold.co/180x280?text=Imagen+no+encontrada'
        }}
      />
      <ul>
        <li className={styles.cardTitle}>{movie.title}</li>
        <li>{movie.genres.join(', ')}</li>
        <li>{movie.year}</li>
      </ul>
    </li>
  )
}

export default MovieItemComponent
