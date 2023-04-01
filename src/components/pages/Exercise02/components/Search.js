const Search = ({
    loading,
    genres,
    order,
    handleChangeGenre,
    handleChangeOrder,
  }) => {
    return (
        <div className="movie-library__actions">
            <select
                name="genre"
                placeholder="Search by genre..."
                onChange={(event) => handleChangeGenre(event.target.value)}
                disabled={loading}
            >
                <option key="genre-opt-default">
                    Select a movie genre
                </option>
                {genres.map((genre, index) => (
                    <option value={genre} key={`genre-opt-${index}`}>
                        {genre}
                    </option>
                ))}
            </select>
            <button onClick={() => handleChangeOrder()} disabled={loading}>
                Year {order === "asc" ? "Ascending" : "Descending"}
            </button>
        </div>
    );
}

export default Search;