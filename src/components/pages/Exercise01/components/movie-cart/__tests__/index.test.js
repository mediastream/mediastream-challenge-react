
import { render } from '@testing-library/react'
import MovieCart from '..'
import movies from '../../../models/movies'

describe('MovieCart', () => {
    it('should render MovieCart component', () => {
        const { container } = render(<MovieCart
            cart={[movies[1]]}
            removeCart={() => { }}
            addCart={() => { }}
            total={24}
            totalWithDiscount={{ discount: true, total: 24 }}
        />)
        expect(container).toBeInTheDocument()
    })
})