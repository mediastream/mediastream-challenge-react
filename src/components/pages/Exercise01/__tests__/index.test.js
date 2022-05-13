import { render } from '@testing-library/react'
import Exercise01 from '..'

describe('Exercise01', () => {
    it('should render Exercise01 component', () => {
        const { container } = render(<Exercise01 />)
        expect(container).toBeInTheDocument()
    })
})