import './styles.css';

export default function Header({ genres, loading, orderLabel, onChangeGenre, onClickYear }) {
  return (
    <div className="movie-library__header">
      <div className="movie-library__header__container">
        <h1 className="movie-library__header__title">
          Movie Library
        </h1>
        <div className="movie-library__header__actions">
          <select name="genre" placeholder="Search by genre..." onChange={event => onChangeGenre(event.target.value)}>

            <option key="default" value="">{loading ? "Loading..." : "Search by genre..."}</option>
            {
              genres.map((genre, index) => {
                return <option key={index} value={genre}>{genre}</option>
              })
            };
          </select>
          <button onClick={onClickYear}>{orderLabel}</button>
        </div>
      </div>
    </div>
  );
}