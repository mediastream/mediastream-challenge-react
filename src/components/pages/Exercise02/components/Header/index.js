import './style.css';

export default function Header() {
  return (
    <>
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre...">
          <option value="genre1">Genre 1</option>
        </select>
        <button>Order Descending</button>
      </div>
    </>
  );
}
