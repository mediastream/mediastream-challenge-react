import React from "react"
import "./movie.css"
import image from "./assets/movie.jpg"
const Movie = ({ movie }) => {
  return (
    <div className="item">
      <div
        className="background"
        style={{
          background: `linear-gradient(
    0deg,
    rgba(151, 215, 0, 0.8) 10%,
    rgba(151, 215, 0, 0.53) 30%,
    rgba(5, 255, 0, 0) 70%
  ),url(${movie.posterUrl}) no-repeat center center / cover,url(${image}) no-repeat center center / cover`,
        }}
      >
        <div className={"movie-details"}>
          <div className={"movie-details__title"}> {movie.title}</div>
          <div className={"movie-details__subdetails"}>
            {movie.genres.join(", ")}
          </div>
          <div className={"movie-details__subdetails"}> {movie.year}</div>
        </div>
      </div>
    </div>
  )
}

export default Movie
