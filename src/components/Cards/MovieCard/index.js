export default function MovieCard({ movie }) {
  return (
    <ul>
      <li> ID: {movie.id} </li>
      <li> Name: {movie.name} </li>
      <li> Price: ${movie.price} </li>
    </ul>
  );
}