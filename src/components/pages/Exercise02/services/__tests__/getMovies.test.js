import getMovies from '../getMovies'

describe('getMovies', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([])
        })
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('should return an array of movies', async () => {
        const movies = await getMovies()
        expect(movies).toEqual([])
    })
})
