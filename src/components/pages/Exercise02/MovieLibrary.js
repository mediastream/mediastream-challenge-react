import "./assets/styles.css";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";

const MovieLibrary = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleMovieFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/movies?_limit=50");
      const json = await res.json();
      setMovies(json);
      console.log(json);
    } catch (error) {
      console.log("Run yarn movie-api for fake api");
    }
    setLoading(false);
  };

  const handleGenreFetch = async () => {
    try {
      const res = await fetch("http://localhost:3001/genres");
      const json = await res.json();
      setGenres(json);
      console.log(json);
    } catch (error) {
      console.log("Error fetching genres");
    }
  };

  const handleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = movies
    .filter((movie) => {
      if (selectedGenre === "") {
        return true;
      } else {
        return movie.genres.includes(selectedGenre);
      }
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });

  useEffect(() => {
    handleMovieFetch();
    handleGenreFetch();
  }, []);

  return (
    <section className="movie-library">
      <div className="movie-library__header">
        <h1 className="movie-library__title">Movie Library</h1>
        <div className="movie-library__actions">
          <select
            name="genre"
            placeholder="Search by genre..."
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres.map((genre, key) => (
              <option value={genre} key={key}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={handleSortOrder}>
            {sortOrder === "asc" ? "Year Descending" : "Year Ascending"}
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="movie-library__wrapper">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieLibrary;
