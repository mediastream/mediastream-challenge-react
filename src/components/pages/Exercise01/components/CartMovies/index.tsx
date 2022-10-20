import { itemCart } from '../../interfaces/index';
import React from 'react'

interface Props {
  cart: itemCart[];
  setProductQuantity: (item: itemCart, action: string) => void;
  total: number;
  totalDiscount: number;
}
const CartMovies = (
  {
    cart,
    setProductQuantity,
    total,
    totalDiscount
  } : Props) => {
  return (

    <div className="movies__cart">
      <ul>
        {cart.map(x => (
          <li className="movies__cart-card" key={x.id}>
            <ul>
              <li>
                ID: {x.id}
              </li>
              <li>
                Name: {x.name}
              </li>
              <li>
                Price: ${x.price}
              </li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => setProductQuantity(x, '-')}>
                -
              </button>
              <span>
                {x.quantity}
              </span>
              <button onClick={() => setProductQuantity(x, '+')}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${totalDiscount > 0
          ? total - (total * totalDiscount)
          : total
          }</p>
      </div>
    </div>

  )
}
export default CartMovies
