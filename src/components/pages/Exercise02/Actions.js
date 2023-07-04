const Actions = ({
  selectedGenre,
  genres,
  onChangeGenre,
  switchOrder,
  order,
}) => {
  return (
    <div className="movie-library__actions">
      <select
        name="genre"
        placeholder="Search by genre..."
        value={selectedGenre}
        onChange={(e) => onChangeGenre(e.target.value)}
      >
        <option value="ALL">All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button onClick={switchOrder}>
        Year {order === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};

export default Actions;
