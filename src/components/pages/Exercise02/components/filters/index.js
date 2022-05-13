const Filters = ({ loadingGenres, genres, genre, onChange, onClick, order, loading}) => {
    return (
        <div className="movie-library__actions">
            {(
                <select
                    disabled={loadingGenres || genres.length === 0}
                    name="genre"
                    placeholder="Search by genre..."
                    value={genre}
                    onChange={onChange}
                >
                    <option value="">
                        All genres
                    </option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>)}
            <button onClick={onClick} disabled={loading}>
                Year {order === 'desc' ? 'Descending' : 'Ascending'}
            </button>
        </div>
    )
}

export default Filters
