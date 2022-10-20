interface Props {
  genres: string[];
  order: string;
  setOrder: (order: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genres: string) => void;
}
const SearchComponent = ({genres, order, setOrder, selectedGenre, setSelectedGenre} : Props) => {
  return (
    <section className={"Search"}>
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..." onChange={ element => setSelectedGenre(element.target.value)}>
          <option key={"all_genres"} value={"all_genres"}>
                {"All genres"}
          </option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={() => {setOrder(order === "Descending" ? "Ascending" : "Descending")}}>Year {order}</button>
      </div>
    </section>
  )
}
export default SearchComponent;