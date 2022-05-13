import { render } from '@testing-library/react'
import Exercise02 from '..'

describe('Exercise02', () => {
    it('should render Exercise02 component', () => {
        const { container } = render(<Exercise02 />)
        expect(container).toBeInTheDocument()
    })
})