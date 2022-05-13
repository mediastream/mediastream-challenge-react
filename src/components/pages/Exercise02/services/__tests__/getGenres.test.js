import getGenres from '../getGenres'

describe('getGenres', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(['Action', 'Adventure', 'Comedy'])
        })
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('should return an array of genres', async () => {
        const genres = await getGenres()
        expect(genres).toEqual(['Action', 'Adventure', 'Comedy'])
    })
})
