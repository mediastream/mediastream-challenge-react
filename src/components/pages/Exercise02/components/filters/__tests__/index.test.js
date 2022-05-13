import { render } from '@testing-library/react'
import Filters from '..'

describe('Filter', () => {
    it('should render correctly', () => {
        const { container } = render(<Filters
            loadingGenres={false}
            genres={['Action','Sci-Fi']}
            genre={'Action'}
            onChange={() => {}}
            onClick={() => {}}
            loading={false}
            order={'desc'}
        />)
        expect(container).toMatchSnapshot()
    })
    it ('should render correctlyand click button', () => {
        const { container, getByText } = render(<Filters
            loadingGenres={false}
            genres={['Action','Sci-Fi']}
            genre={'Action'}
            onChange={() => {}}
            onClick={() => {}}
            loading={false}
            order={'asc'}
        />)
        expect(container).toMatchSnapshot()
        getByText('Year Ascending').click()
        expect(container).toMatchSnapshot()
    })
})