export default function Filters({
  loading,
  genres,
  order,
  handleChangeGenre,
  handleChangeOrder,
}) {
  return (
    <div className="movie-library__actions">
      <select
        name="genre"
        placeholder="Search by genre..."
        onChange={(event) => handleChangeGenre(event.target.value)}
        disabled={loading}
      >
        {genres.map((genre) => (
          <option value={genre} key={genre}>
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
