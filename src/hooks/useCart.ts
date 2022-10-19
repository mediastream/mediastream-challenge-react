import { useEffect, useState } from 'react'
import { initialCart, movies, discountRules } from '../constants'

export const useCart = () => {
  const [cart, setCart] = useState(initialCart)

  const [totalCart, setTotalCart] = useState({
    subtotal: 0,
    discountRate: 0,
    discount: 0,
    total: 0,
  })

  useEffect(() => {
    const newSubTotal = cart.reduce(
      (acc: any, { price, quantity }: any) => acc + price * quantity,
      0,
    )
    const calculatedDiscountRate = getDiscountRate(cart, discountRules)
    const calculatedDiscount = newSubTotal * calculatedDiscountRate
    setTotalCart({
      subtotal: newSubTotal,
      discountRate: calculatedDiscountRate,
      discount: calculatedDiscount,
      total: newSubTotal - calculatedDiscount,
    })
  }, [cart])

  const getCartItem = (cart: any[], movie: any) => {
    return cart.find(({ id }) => id === movie.id)
  }

  const getDiscountRate = (cart: any[], rules: any[]) => {
    let totalDiscount = 0
    for (let { m, discount } of rules) {
      const shouldApply = m.every((id: any) => cart.some(cartItem => cartItem.id === id))
      if (shouldApply) {
        totalDiscount = Math.max(totalDiscount, discount)
      }
    }
    return totalDiscount
  }

  const addToCart = (movie: any) => {
    const newCart = [...cart]
    const cartItem = getCartItem(newCart, movie)
    if (cartItem) {
      cartItem.quantity++
    } else {
      const newCartItem = { ...movie, quantity: 1 }
      newCart.push(newCartItem)
    }
    setCart(newCart)
  }

  const onDecrement = (movie: any) => {
    const newCart = [...cart]
    const cartItem = getCartItem(newCart, movie)
    if (cartItem) {
      cartItem.quantity--
      setCart(newCart.filter(({ quantity }) => quantity > 0))
    }
  }

  const onIncrement = (movie: any) => addToCart(movie)

  return {
    movies,
    cart,
    totalCart,
    addToCart,
    onIncrement,
    onDecrement,
  }
}
