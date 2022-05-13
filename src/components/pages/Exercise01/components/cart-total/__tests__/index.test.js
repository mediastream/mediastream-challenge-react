import { render } from '@testing-library/react'
import CartTotal from '..'

describe('CartTotal', () => {
    it('should render CartTotal component', () => {
        const { container } = render(<CartTotal total={0} totalWithDiscount={{ discount: true, total: 0 }} />)
        expect(container).toBeInTheDocument()
    })

    it('should render CartTotal component when discounts is false', () => {
        const { container } = render(<CartTotal total={0} totalWithDiscount={{ discount: false, total: 0 }} />)
        expect(container).toBeInTheDocument()
    })
})