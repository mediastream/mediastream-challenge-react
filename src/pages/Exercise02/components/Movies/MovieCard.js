import React, { memo, useCallback } from "react";
import ImgInterrogacion from "../../assets/interrogacion.jpg";

function MovieCard({ movie }) {
  const handleImgError = useCallback((e) => {
    e.target.src = ImgInterrogacion;
  }, []);

  return (
    <div className="movie-library__card">
      <div className="movie-library__card__overlay"></div>
      <div className="movie-library__card">
        <img src={movie.posterUrl} alt={movie.title} onError={handleImgError} />
        <div className="movie-detail__Card">
          <p className="movie-detail__Card__title">{movie.title}</p>
          <p>{movie.genres.join(", ")}</p>
          <p>{movie.year}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieCard);
