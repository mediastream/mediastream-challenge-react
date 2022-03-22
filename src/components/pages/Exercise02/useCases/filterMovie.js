export const getStringifyMovieFilter = (selectedGenre, isDescending) => {
  let filterQuery = []
  if (selectedGenre) filterQuery.push(`genres_like=${selectedGenre}`)
  filterQuery.push(`_sort=year&_order=${isDescending ? 'desc' : 'asc'}`)

  return filterQuery.length > 0
    ? `&${filterQuery.join('&')}`
    : ''
}