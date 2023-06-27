import './styles.css';

export default function Header() {
  return (
    <div className="movie-library__header">
      <div className="movie-library__header__container">
        <h1 className="movie-library__header__title">
          Movie Library
        </h1>
        <div className="movie-library__header__actions">
          <select name="genre" placeholder="Search by genre...">
            <option value="genre1">Genre 1</option>
          </select>
          <button>Year Descending</button>
        </div>
      </div>
    </div>
  );
}
