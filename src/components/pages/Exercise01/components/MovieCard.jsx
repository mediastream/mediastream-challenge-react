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

export default MovieCard
