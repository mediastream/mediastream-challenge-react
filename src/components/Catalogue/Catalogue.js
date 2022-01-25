import React, { memo } from "react"
import Movie from "../Movie/Movie"
import "./catalogue.css"

const Catalogue = memo(({ movies, filter, order }) => {
  return (
    <div className="container">
      {movies.map(
        (movie) =>
          (!filter || movie.genres.includes(filter)) && (
            <Movie key={movie.id} movie={movie} />
          )
      )}
    </div>
  )
})

export default Catalogue
