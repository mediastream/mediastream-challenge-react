import { useCallback, useMemo, useState } from "react"

export const useCart = () => {
  const [cart, setCart] = useState([])
  const discountRules = useMemo(
    () => [
      {
        m: [3, 2],
        discount: 0.25,
      },
      {
        m: [2, 4, 1],
        discount: 0.5,
      },
      {
        m: [4, 2],
        discount: 0.1,
      },
    ],
    []
  )

  const changeQuiantityMovieCart = useCallback((movie, operation) => {
    setCart((prevState) => {
      return prevState.reduce((acc, element) => {
        if (element.id === movie.id) {
          const newQuantity = element.quantity + operation
          if (newQuantity === 0) {
            return acc
          }
          return [...acc, { ...element, quantity: newQuantity }]
        }
        return [...acc, element]
      }, [])
    })
  }, [])

  const handleAddMovieToCart = useCallback(
    (movie) => {
      setCart((prevState) => {
        const movieExist = prevState.find((element) => element.id === movie.id)
        if (movieExist) {
          changeQuiantityMovieCart(movie, +1)
          return prevState
        }
        return [...prevState, { ...movie, quantity: 1 }]
      })
    },
    [changeQuiantityMovieCart]
  )

  const handleIncreaseMovieCount = (movie) => {
    changeQuiantityMovieCart(movie, +1)
  }

  const handleDecreaseMovieCount = (movie) => {
    changeQuiantityMovieCart(movie, -1)
  }

  const searchRuleInCart = useCallback(
    (movieId) => {
      return cart.find((element) => element.id === movieId)
    },
    [cart]
  )

  const disponibleDiscounts = useMemo(() => {
    return discountRules.reduce((acc, el) => {
      const applicableDiscount = el.m.reduce((accumulator, element) => {
        const existsInCart = searchRuleInCart(element)
        if (existsInCart) {
          return [...accumulator, existsInCart]
        }
        return accumulator
      }, [])
      if (
        applicableDiscount.length === el.m.length &&
        cart.length === applicableDiscount.length
      ) {
        return { ...el, applicable: true }
      }
      return null
    }, {})
  }, [discountRules, searchRuleInCart, cart])

  const total = useMemo(() => {
    const actualTotal = cart.reduce((acc, el) => {
      return acc + el.price * el.quantity
    }, 0)
    if (disponibleDiscounts) {
      return actualTotal - actualTotal * disponibleDiscounts.discount
    }
    return actualTotal
  }, [cart, disponibleDiscounts])

  return {
    cart,
    total,
    handleAddMovieToCart,
    handleDecreaseMovieCount,
    handleIncreaseMovieCount,
  }
}
