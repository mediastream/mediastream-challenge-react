import React, { memo } from "react";

const MovieListItem = ({ id, posterUrl, title, year, genres }) => (
  <li key={id} className="movie-library__card">
    <div
      className="card__wrapper"
      style={{
        background: `linear-gradient(to bottom, rgba(151, 215, 0, 0.2), transparent, transparent, rgba(151, 215, 0, 0.7)), url('${posterUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
      }}
    >
      <ul>
        <li>{title}</li>
        <li>{genres.join(", ")}</li>
        <li>{year}</li>
      </ul>
    </div>
  </li>
);

export default memo(MovieListItem);
