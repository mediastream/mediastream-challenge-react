import React from 'react'
import styles from './CartContainerComponent.module.scss'

interface IProps {
  cartItems: any[]
  decrementHandler: (item: any) => void
  incrementHandler: (item: any) => void
  children: any
}

const CartContainerComponent: React.FunctionComponent<IProps> = ({
  cartItems,
  decrementHandler,
  incrementHandler,
  children,
}: IProps) => {
  return (
    <div className={styles.cart}>
      <ul>
        {cartItems.map(movie => (
          <li key={movie.id} className={styles.card}>
            <ul>
              <li>ID: {movie.id}</li>
              <li>Name: {movie.name}</li>
              <li>Price: ${movie.price}</li>
            </ul>
            <div className={styles.quantity}>
              <button onClick={() => decrementHandler(movie)}>-</button>
              <span>{movie.quantity}</span>
              <button onClick={() => incrementHandler(movie)}>+</button>
            </div>
          </li>
        ))}

        {cartItems.length === 0 && <EmptyCart />}
      </ul>

      {cartItems.length ? children : null}
    </div>
  )
}
const EmptyCart = () => {
  return (
    <li className={styles.card}>
      <ul>
        <li
          style={{
            textAlign: 'center',
          }}
        >
          <p>Empty cart</p>
          <p>Try adding a movie to cart</p>
        </li>
      </ul>
    </li>
  )
}

export default CartContainerComponent
