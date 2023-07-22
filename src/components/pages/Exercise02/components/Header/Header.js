export const Header = ({ setGenre, setOrder, order, genres }) => {
    return (
        <>
            <h1 className="movie-library__title">
                Movie Library
            </h1>
            <div className="movie-library__actions">
                <select name="genre" placeholder="Search by genre..." onChange={(e) => setGenre(e.target.value)}>
                    {genres.map((genre) => {
                        return <option value={genre}>{genre}</option>
                    })}
                </select>
                <button onClick={() => setOrder(order === 'Ascending' ? 'Descending' : 'Ascending')}>Year {order}</button>
            </div>
        </>
    )
}