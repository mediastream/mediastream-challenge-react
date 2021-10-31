import { useState } from 'react'
import MovieCard from './MovieCard'
import QuantityManager from './QuantityManager'

function Cart({cart, setCart}) {
  const [discount, setDiscount] = useState(0)
  const discountRules = [
    {
      m: [2, 3], // 5
      discount: 0.25
    },
    {
      m: [1, 2, 4], //7
      discount: 0.5
    },
    {
      m: [2, 4], //6
      discount: 0.1
    } 
  ]

  const prices = cart.map(item => item.price * item.quantity)
  const movieIds = cart.map(item => item.id)
  console.log(prices)

  const getTotal = () => {
    const finalPrice = prices.length ? prices.reduce((total, item) => total + item) : 0
    const compareArrays = (a, b) => a.every((val, index) => val === b[index])
    const discountIndex = discountRules.findIndex(rule => compareArrays(rule.m, movieIds.sort()))
    const discountValue = discountRules[discountIndex] === undefined ? 1 : discountRules[discountIndex].discount    
    return discountRules[discountIndex] === undefined ? finalPrice : finalPrice - (discountValue * finalPrice)
  }

  return (
    <div className="movies__cart">
      <ul>
        {cart.map(item => (
          <li className="movies__cart-card">
            <MovieCard item={item} />
            <QuantityManager item={item} cart={cart} setCart={setCart}/>
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()} { discount === 0 ? '' : ` -${discount*100}%` } </p>
      </div>
    </div>
  )
}

export default Cart
