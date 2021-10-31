import MovieCard from './MovieCard'

function MovieList({movies, setCart}){
  const handleChange = e => {
    return setCart(prevCart => {
      if(!prevCart.map(element => element.id).includes(e.id)){
        e.quantity = 1
        return [...prevCart, e]
      } else {
        return prevCart
      }
    })
  }

  return (
    <div className="movies__list">
      <ul>
        {movies.map(item => (
          <li className="movies__list-card" key={item.id}>
            <MovieCard item={item} />
            <button onClick={ () => handleChange(item) }>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
