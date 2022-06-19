function Header(props) {
  const { selectedGenre, order, genres, onGenderChange, onOrderClick } = props;

  return (
    <div className="movie-library__header">
      <h1 className="movie-library__title">Movie Library</h1>
      <div className="movie-library__actions">
        <select
          name="genre"
          value={selectedGenre}
          onChange={onGenderChange}
          data-testid="genre-list"
        >
          <option value="">Show all</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={onOrderClick}>
          Year {order === 'desc' ? 'Descending' : 'Ascending'}
        </button>
      </div>
    </div>
  );
}

export default Header;
