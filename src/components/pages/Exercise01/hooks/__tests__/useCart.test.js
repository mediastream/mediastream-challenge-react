import useCart from '../useCart';
import { renderHook, act } from '@testing-library/react-hooks'
import moviesInitialState from '../../models/moviesInitialState'
import movies from '../../models/movies'

describe('useCart', () => {
    it('should return cart object and it works correctly', () => {
        const { result } = renderHook(() => useCart(moviesInitialState))
        expect(result.current.cart).toEqual(moviesInitialState)

        act(() => { result.current.addCart(movies[1]) })
        expect(result.current.cart).toEqual([
            { id: 1, name: 'Star Wars', price: 20, quantity: 2 },
            { id: 2, name: 'Minions', price: 25, quantity: 1 },
        ])

        act(() => { result.current.addCart(movies[1]) })

        expect(result.current.cart).toEqual([
            { id: 1, name: 'Star Wars', price: 20, quantity: 2 },
            { id: 2, name: 'Minions', price: 25, quantity: 2 },
        ])

        act(() => { result.current.removeCart(movies[1]) })
        expect(result.current.cart).toEqual([
            { id: 1, name: 'Star Wars', price: 20, quantity: 2 },
            { id: 2, name: 'Minions', price: 25, quantity: 1 },
        ])

        expect(result.current.getTotal()).toEqual(65)
        expect(result.current.getTotalWithDiscount()).toEqual({ discount: false, total: 65 })

        act(() => { result.current.addCart({ id: 4, name: '4', price: 25, quantity: 1 }) })
        expect(result.current.getTotalWithDiscount()).toEqual({ discount: true, total: 45 })

        act(() => { result.current.removeCart({ id: 4, name: '4', price: 25, quantity: 1 }) })
        expect(result.current.getTotalWithDiscount()).toEqual({ discount: false, total: 65 })
    })
    it('should return default empty cart', () => {
        const { result } = renderHook(() => useCart())
        expect(result.current.cart).toEqual([])
    })
})