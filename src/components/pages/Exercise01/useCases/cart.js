const discountRules = [
  {
    m: [3, 2],
    discount: 0.25
  },
  {
    m: [2, 4, 1],
    discount: 0.5
  },
  {
    m: [4, 2],
    discount: 0.1
  }
]

export const addProductToCart = (cart, movie) => {
  let isPresent = false

  const cartUpdated = cart.map(cartItem => {
    if (cartItem.id === movie.id) {
      cartItem.quantity += 1
      isPresent = true
    }
    return cartItem
  })

  if (!isPresent) cartUpdated.push({ ...movie, quantity: 1 })

  return cartUpdated
}

export const decrementItemOnCart = (cart, movie) => {
  return cart.reduce((updatedCart, item) => {
    if (item.id === movie.id) {
      item.quantity = Math.max(--item.quantity, 0)
    }

    if (item.quantity > 0)  updatedCart.push(item)

    return updatedCart
  }, [])
}

export const incrementItemOnCart = (cart, movie) => {
  return cart.reduce((updatedCart, item) => {
    if (item.id === movie.id) {
      item.quantity += 1
    }

    updatedCart.push(item)
    return updatedCart
  }, [])
}

export const getTotal = (cart) => {
  const subTotal = cart.reduce((total, item) => item.price * item.quantity + total, 0)

  const hasAnyDiscountOffer = discountRules.find(
    ({ m }) => m.length === cart.length &&
      m.every(itemId => cart.some(item => item.id === itemId))
  )

  const discountOff = hasAnyDiscountOffer ? subTotal * hasAnyDiscountOffer.discount : 0
  return subTotal - discountOff
}