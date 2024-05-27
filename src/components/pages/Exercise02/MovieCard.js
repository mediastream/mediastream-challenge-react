import React from "react";
import "./assets/movieCard.css";




const MovieCard = ({ movie }) => {  
    const placeholderImage = "https://firebasestorage.googleapis.com/v0/b/metamanager-18130.appspot.com/o/noImg.png?alt=media&token=227291b0-a5b3-430b-a16e-10c58c12abd1"
    const handleImageError = (e) => {
      e.target.src = placeholderImage
    }
  
  return (
    <article className="movie">
      <header className="movie_card-header">
        <img src={movie?.posterUrl||placeholderImage} alt={movie?.title} className="movie_card-img" onError={handleImageError} />
      </header>
      <section className="movie_card-body">
        <h3 className="movie_card-name"> {movie?.title}</h3>
        <p className="movie_card-genres">{movie?.genres.join(", ")}</p>
        <p className="movie_card-year">{movie?.year}</p>
      </section>
    </article>
  );
};

export default MovieCard;
