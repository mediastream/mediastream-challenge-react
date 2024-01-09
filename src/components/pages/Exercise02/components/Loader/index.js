import './styles.css';

export default function Loader({ fetchCount }) {
  return (
    <div className="movie-library__loading">
      <p>Loading...</p>
      <p>Fetched {fetchCount} times</p>
    </div>
  );
}