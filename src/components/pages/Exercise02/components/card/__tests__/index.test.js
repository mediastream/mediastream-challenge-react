import { render } from '@testing-library/react'
import Card from '..'

describe('Card', () => {
    it('should render without crashing', () => {
        render(<Card movie={{
            id: 4,
            title: 'Crocodile Dundee',
            year: 1986,
            genres: ['Action'],
            posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg'
        }} />)
    })
})