/* eslint-disable react-hooks/exhaustive-deps */
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

 import "./assets/styles.css";
 import { useEffect, useState } from "react";
 import api from "../../../services/api";
 
 export default function Exercise02 () {
   const [movies, setMovies] = useState([]);
   const [genres, setGenres] = useState([]);
   const [genreSelected, setGenreSelected] = useState(null);
   const [fetchCount, setFetchCount] = useState(0);
   const [loading, setLoading] = useState(false);
   const [asc, setAsc] = useState(true);
 
   const handleMovieFetch = async () => {
     try {
       const order = asc ? 'asc' : 'desc';
       setLoading(true)
       setFetchCount(fetchCount + 1)
       const {data} = genreSelected ? await api.get(`movies?_limit=50&_sort=year&_order=${order}&genres_like=${genreSelected}`) : await api.get(`movies?_limit=10&_sort=year&_order=${order}`)
       setMovies(data);
     } catch (error) {
       console.log('Run yarn movie-api for fake api')
     } finally {
       setLoading(false)
       setFetchCount(0)
     }
   }
 
   const handleGenresFetch = async () => {
     try {
       const {data} = await api.get('genres');
       setGenres(data);
     } catch (error) {
       console.log(error)
     } 
   }
 
   const handleFilterGenre = async (event) => {
     try {
      setGenreSelected(event.target.value)
       if(event.target.value !== 'Select a genre'){
         setLoading(true)
         setFetchCount(fetchCount + 1)
         
         setMovies([])
         const {data} = await api.get(`movies?genres_like=${event.target.value}`);
         setMovies(data);
       }
     } catch (error) {
       console.log(error)
     } finally {
       setLoading(false)
       setFetchCount(0)
     }
   }
 
   useEffect(() => {
     handleMovieFetch();
     handleGenresFetch();
   }, [asc])
 
   return (
    <div>
      <div className="translucent-screen" />
       <section className="movie-library">
       
      
         <h1 className="movie-library__title">
           Movie Library
         </h1>
    
       <div className="movie-library__actions">
         <select onChange={handleFilterGenre} value={genreSelected} name="genre" placeholder="Search by genre...">
           {genres.map((item, i) => (
             <option key={i.toString()} value={item}>{item}</option>
           ))}
         </select>
         <button onClick={()=> setAsc(!asc)}>Year {asc ? 'Ascending' : 'Descending'}</button>
       </div>
       {loading ? (
         <div className="movie-library__loading">
           <p>Loading...</p>
           {/* <p>Fetched {fetchCount} times</p> */}
         </div>
       ) : (
         <div className="movie-library__list">
           {movies.map(movie => (
             <div key={movie.id} className="movie-library__card">
               <div className="movie-library_card_background">
               <ul>
               
               <li className="movie-title">{movie.title}</li>
               {/* <li>Title: {movie.title}</li>
               
               <li>Runtime: {movie.runtime}</li> */}
               <li className="genres">{movie.genres.join(', ')}</li>
               <li className="genres">{movie.year}</li>
             </ul>
               </div>
               <img src={movie.posterUrl} alt={movie.title} />
               
             </div>
           ))}
         </div>
       )}
       
     </section>
    </div>
   )
 }