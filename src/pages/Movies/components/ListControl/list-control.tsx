import styles from './list-control.module.scss';
import useSWR from 'swr';
import { ChangeEvent } from 'react';
import { fetcher } from 'helpers/api';
import { useMovies } from 'pages/Movies/context';

const ListControl = () => {
  return (
    <menu className={styles.container}>
      <li>
        <GenreFilter />
      </li>
      <li>
        <SortButton />
      </li>
    </menu>
  );
};

export default ListControl;

const GenreFilter = () => {
  const { filterByGenre } = useMovies();
  const { data, isLoading } = useSWR<string[], Error>('/genres', fetcher);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    filterByGenre(value);
  };

  return (
    <select className={styles.select} disabled={isLoading} onChange={handleChange}>
      <option value="">{isLoading ? 'Loading...' : 'All'}</option>
      {data?.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

const SortButton = () => {
  const { order, toggleOrder } = useMovies();

  const handleClick = () => {
    toggleOrder();
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      {order === 'asc' ? 'Year Ascending' : 'Year Descending'}
    </button>
  );
};
