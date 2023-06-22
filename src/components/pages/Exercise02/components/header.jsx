export default function Header({ loading, genres, params, filterAndSortMovies }) {
    return (
        <div className="movie-library__title">
            <h1>Movie Library</h1>
            <div className="movie-library__actions">
                <select
                    name="genre"
                    placeholder="Search by genre..."
                    value={params.genre}
                    onChange={({target: { value }}) => filterAndSortMovies({genre: value})}
                >
                    <option value=""></option>
                    {
                        !loading && genres.map(genre => <option value={genre}>{genre}</option>)
                    }
                </select>
                <button onClick={() => filterAndSortMovies({sort: params.sort === 'asc' ? 'desc' : 'asc'})}>
                    {
                        params.sort === 'asc' ? "Year Descending" : "Year Ascending"
                    }
                </button>
            </div>
        </div>
    )
}