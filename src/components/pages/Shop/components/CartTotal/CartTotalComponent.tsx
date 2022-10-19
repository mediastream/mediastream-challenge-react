import React from 'react'
import styles from './CartTotalComponent.module.scss'

interface IProps {
  resume: any
}

const CartTotalComponent: React.FunctionComponent<IProps> = ({ resume }: IProps) => {
  const { subtotal, discountRate, discount, total } = resume

  return (
    <div className={styles.resume}>
      <p>Subtotal: ${subtotal}</p>
      {discount > 0 && (
        <p>
          Discount (${discountRate * 100} %): ${discount}
        </p>
      )}

      <p className={styles.total}>Total: ${total}</p>
    </div>
  )
}

export default CartTotalComponent
