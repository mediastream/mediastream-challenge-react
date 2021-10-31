function GenreSelect({genres, handleFilter}){
  return(
    <select name="genre" placeholder="Search by genre..." onChange={handleFilter}>
      {genres.map(item => <option value={item}>{item}</option>)}
    </select>
  )
}

export default GenreSelect
