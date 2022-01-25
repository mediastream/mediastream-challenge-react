function MovieCard({ movies }) {
  return (
    <div style={{}}>
      {movies.map((movie) => (
        <div key={movie.id} style={{ marginBottom: 30 }}>
          <img src={movie.posterUrl} alt={movie.title} />
          <ul style={{ margin: 10, fontSize: 18 }}>
            <li style={{ fontWeight: "bold", paddingBottom: 5 }}>
              {movie.title}
            </li>
            <li style={{ paddingBottom: 5 }}> {movie.genres.join(", ")}</li>
            <li>{movie.year}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
