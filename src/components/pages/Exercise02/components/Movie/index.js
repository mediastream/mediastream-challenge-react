import { memo } from "react";

import "./styles.css";

const Movie = ({ posterUrl, title, year, genres }) => (
  <li className="movie-library__card">
    <div className="movie-library__card-background" />
    <img src={posterUrl} alt={title} />
    <ul className="movie-library__card-info">
      <li className="movie-library__card-info__text-bold">Title: {title}</li>
      <li className="movie-library__card-info__text-normal">
        Genres: {genres.join(", ")}
      </li>
      <li className="movie-library__card-info__text-normal">Year: {year}</li>
    </ul>
  </li>
);

export default memo(Movie);
