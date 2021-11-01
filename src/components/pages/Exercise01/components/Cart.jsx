import { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import MovieCard from './MovieCard'
import QuantityManager from './QuantityManager'
import discountRules from './data/discountRules.json'

function Cart({cart, setCart}) {
  const [discount, setDiscount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  
  const prices = cart.map(item => item.price * item.quantity)
  const movieIds = cart.map(item => item.id)

  useEffect(() => {
    const finalPrice = prices.length ? prices.reduce((total, item) => total + item) : 0
    const discountIndex = discountRules.findIndex(rule => compareArrays(rule.m, movieIds.sort()))
    const discountValue = discountRules[discountIndex] === undefined ? 0 : discountRules[discountIndex].discount    
    setDiscount(discountValue)
    setFinalPrice(finalPrice - (discountValue * finalPrice))
  }, [prices, movieIds])

  return (
    <div className="movies__cart">
      <ul>
        {cart.map(item => (
          <li className="movies__cart-card" key={item.id}>
            <MovieCard item={item} />
            <QuantityManager item={item} cart={cart} setCart={setCart} />
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${finalPrice} </p> 
        <p className="priceDiscount"> {discount !== 0 ?` (${discount*100}% discount)` : ""} </p>
      </div>
    </div>
  )
}

const compareArrays = (a, b) => a.every((val, index) => val === b[index])

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  setCart: PropTypes.func
}

export default Cart
