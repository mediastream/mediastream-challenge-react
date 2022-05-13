// test CartTotal component
import { render } from '@testing-library/react'
import MovieCard from '..'
import movies from '../../../models/movies'

describe('MovieCard', () => {
    it('should render MovieCard component', () => {
        const { container } = render(<MovieCard movie={movies[0]} addCart={() => { }} type="catalog" />)
        expect(container).toBeInTheDocument()
    })
    it('should render MovieCard component type cart', () => {
        const { container } = render(<MovieCard movie={movies[0]} addCart={() => { }} type="cart" />)
        expect(container).toBeInTheDocument()
    })
    it('should render MovieCard component and press add and remove button', () => {
        const { getByTestId } = render(<MovieCard movie={movies[0]} addCart={() => { }} type="catalog" />)
        const buttonAdd = getByTestId('button-add-cart')
        buttonAdd.click()
    })

    it('should render MovieCard component and press add and remove button  type cart', () => {
        const { getByTestId } = render(<MovieCard movie={movies[0]} addCart={() => { }} removeCart={() => { }} type="cart" />)
        const buttonAdd = getByTestId('button-add-cart')
        buttonAdd.click()
        const buttonRemove = getByTestId('button-remove-cart')
        buttonRemove.click()
    })
})