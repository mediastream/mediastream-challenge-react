import { useState } from 'react'
import discountRules from '../models/discountRules'
import areEqualAndIsNotEmpty from '../utils/areEqualAndIsNotEmpty'

const useCart = (initialState = []) => {
    const [cart, setCart] = useState(initialState)

    const addCart = (item) => {
        const findCart = cart.find(c => c.id === item.id)
        if (findCart) {
            findCart.quantity += 1
            setCart([...cart])
        } else {
            setCart([...cart, { ...item, quantity: 1 }])
        }
    }

    const removeCart = (item) => {
        const findCart = cart.find(c => c.id === item.id)
        if (findCart.quantity > 1) {
            findCart.quantity -= 1
            setCart([...cart])
        } else {
            setCart(cart.filter(c => c.id !== item.id))
        }
    }

    const getTotal = () => cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

    const getTotalWithDiscount = () => {
        const total = getTotal()
        const ids = cart.map(item => item.id)
        const discount = discountRules.find(rule => areEqualAndIsNotEmpty(rule.m, ids))

        if (discount) return { total: total - (total * discount.discount), discount: true }
        return { total, discount: false }
    }

    return {
        cart,
        addCart,
        removeCart,
        getTotal,
        getTotalWithDiscount,
    }
}

export default useCart
