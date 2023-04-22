/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css';

import Card from './components/Card';
import useExercise02 from './useExercise02';

let rendered = 0;

export default function Exercise02() {
  // --- Hooks --- //
  const [
    { loadingItemRef, loadingRef, fetchCount, movies, genres, actions },
    { handleFetchMovies },
  ] = useExercise02();

  // ---- rendered count ---- //
  console.count('rendered');
  rendered += 1;

  return (
    <>
      <p ref={loadingItemRef} className='item__hidden'>
        ...{' '}
      </p>
      <div ref={loadingRef}>
        <div className='hero-background'>
          <section className='movie-library'>
            <h1 className='movie-library__title'>
              Movie Library - Rendered {rendered} times - Fetched{' '}
              {fetchCount.current} times
            </h1>
            <div className='movie-library__actions'>
              <select
                value={actions.genres_like}
                name='genres_like'
                placeholder='Search by genre...'
                onChange={(e) =>
                  handleFetchMovies(e.target.name, e.target.value)
                }
              >
                {genres.map((genre) => (
                  <option value={genre} key={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  handleFetchMovies(
                    '_order',
                    actions._order === 'asc' ? 'desc' : 'asc'
                  )
                }
              >
                Year {actions._order === 'asc' ? 'Descending' : 'Ascending'}
              </button>
            </div>

            <ul className='movie-library__list'>
              {movies.map((movie) => (
                <Card item={movie} key={movie.id} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

/*
   
  EN EL INICIO DEL PROYECTO ESTABA ESTE PROBLEMA DE UN BUCLE INFINITO, 
  PERO LO SOLUCIONE CON EL USECALLBACK. Abajo les dejo la solución y el porqué del problema.

  *Cuando defines una función dentro del cuerpo de un componente de React,
  *se crea una nueva instancia de la función cada vez que el componente se renderiza.
  *Si utilizas esta función dentro de un useEffect, el efecto se dispara en cada actualización del componente,
  *lo que a su vez hace que la función se actualice nuevamente, lo que puede causar un bucle infinito.    
  
  *Para evitar esto, debes definir la función fuera del componente
  *o utilizar useCallback para que la función no se actualice en cada renderización.

  const handleMovieFetch = useCallback(() => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  })

  useEffect(() => {
    handleMovieFetch()
  }, [handleMovieFetch])

*/
