import { useLoaderData } from 'react-router-dom';
import { useRef, useState } from 'react';
import { getMovies } from '../../../services';

const useExercise02 = () => {
  // --- Hooks --- //

  const [rawMovies, genres] = useLoaderData();
  const fetchCount = useRef(1);
  const loadingRef = useRef(null);
  const loadingItemRef = useRef(null);

  // --- States --- //

  const [movies, setMovies] = useState(rawMovies);
  const [actions, setActions] = useState({
    genres_like: '',
    _order: 'asc',
  });

  // --- functions --- //

  /**
   * build query params by an object
   * @param {*} obj
   * @returns query params
   */
  const buildQueryParams = (obj) => {
    return Object.entries(obj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  };

  /**
   * set loading state
   * @param {*} isLoading
   * @param {*} callback
   */
  const setLoading = (isLoading, callback = () => {}) => {
    if (isLoading) {
      loadingRef.current.className = 'movie-library__loading';
      loadingItemRef.current.className = 'movie-library__loading-item fade-in';
    } else {
      loadingItemRef.current.className = 'movie-library__loading-item fade-out';

      const timer = setTimeout(() => {
        loadingRef.current.className = '';
        loadingItemRef.current.className = 'item__hidden';

        callback();

        clearTimeout(timer);
      }, 700);
    }
  };

  /**
   * fetch movies by query params(ordering,filter, etc...) , set movies and actions
   * @param {*} name
   * @param {*} value
   */
  const handleFetchMovies = async (name, value) => {
    // avoid fetch when the same action is clicked
    if (actions[name] === value) return;

    fetchCount.current += 1;

    setLoading(true);

    const objParams = {
      ...actions,
      _limit: 100 * 10,
      _sort: 'year',
      [name]: value,
    };

    const moviesFiltered = await getMovies(buildQueryParams(objParams));

    setLoading(false, () => {
      setMovies(moviesFiltered);
      setActions((prev) => ({
        ...prev,
        [name]: value,
      }));
    });
  };

  return [
    { loadingItemRef, loadingRef, fetchCount, movies, genres, actions },
    { handleFetchMovies },
  ];
};

export default useExercise02;
