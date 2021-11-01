import PropTypes from 'prop-types'

function MovieCard({item}){
  return(
    <>
      <ul>
        <li>
          ID: {item.id}
        </li>
        <li>
          Name: {item.name}
        </li>
        <li>
          Price: ${item.price}
        </li>
      </ul>
    </>
  )
}

MovieCard.prototype = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number
  })
}

export default MovieCard
