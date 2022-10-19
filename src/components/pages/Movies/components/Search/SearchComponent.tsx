import React from 'react'
import styles from './SearchComponent.module.scss'

interface IProps {
  genres?: any[]
  order: number
  onChangeGenre: (genre: string) => void
  onChangeOrder: () => void
}

const SearchComponent: React.FunctionComponent<IProps> = ({
  genres,
  onChangeGenre,
  order,
  onChangeOrder,
}: IProps) => {
  return (
    <div className={styles.container}>
      <select
        name="genre"
        placeholder="Search by genre..."
        onChange={e => onChangeGenre(e.target.value)}
      >
        <option value="">All</option>
        {genres?.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={onChangeOrder}>Year {order > 0 ? 'Descending' : 'Ascending'}</button>
    </div>
  )
}

SearchComponent.defaultProps = {
  genres: [],
}

export default SearchComponent
