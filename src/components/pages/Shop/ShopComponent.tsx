import React from 'react'
import { useCart } from '../../../hooks/useCart'
import CartContainerComponent from './components/CartContainer/CartContainerComponent'
import CartTotalComponent from './components/CartTotal/CartTotalComponent'
import ShopItemsComponent from './components/ShopItems/ShopItemsComponent'
import styles from './ShopComponent.module.scss'

const ShopComponent: React.FunctionComponent = () => {
  const { movies, cart, totalCart, addToCart, onIncrement, onDecrement } = useCart()

  return (
    <section className={styles.container}>
      <ShopItemsComponent movies={movies} addToCartHandler={addToCart} />
      <CartContainerComponent
        cartItems={cart}
        incrementHandler={onIncrement}
        decrementHandler={onDecrement}
      >
        <CartTotalComponent resume={totalCart} />
      </CartContainerComponent>
    </section>
  )
}

export default ShopComponent
