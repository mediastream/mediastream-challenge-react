/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (getMovies)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Exercise02() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [fetchCount, setFetchCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [moviesFiltered, setMoviesFiltered] = useState([]);

	const getMovies = () => {
		setLoading(true);
		setFetchCount(fetchCount + 1);
		fetch('http://localhost:3001/movies?_limit=50')
			.then((res) => res.json())
			.then((json) => {
				setMovies(json);
				setMoviesFiltered(json);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getGenres = () => {
		setLoading(true);
		setFetchCount(fetchCount + 1);
		fetch('http://localhost:3001/genres')
			.then((res) => res.json())
			.then((json) => {
				setGenres(json);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getMovies();
		getGenres();
	}, []);

	useEffect(() => {
		const order = searchParams.get('order');
		const genre = searchParams.get('genre');

		const moviesOrdered = movies
			.filter((movie) => (genre && genre !== 'All' ? movie.genres.includes(genre) : true))
			.sort((a, b) => {
				if (order === 'desc') {
					return b.year - a.year;
				} else if (order === 'asc') {
					return a.year - b.year;
				}
				return 0;
			});
		setMoviesFiltered(moviesOrdered);
	}, [searchParams]);

	const handleGenre = (event) => {
		const genre = event.target.value;
		const params = new URLSearchParams();
		params.set('genre', genre);
		params.set('order', searchParams.get('order'));
		setSearchParams(params);
	};

	const handleOrder = () => {
		const params = new URLSearchParams();
		params.set('order', searchParams.get('order') === 'desc' ? 'asc' : 'desc');
		params.set('genre', searchParams.get('genre') || 'All');
		setSearchParams(params);
	};

	return (
		<section className='movie-library'>
			<h1 className='movie-library__title'>Movie Library</h1>
			<div className='movie-library__actions'>
				<select
					name='genre'
					placeholder='Search by genre...'
					onChange={handleGenre}
					value={searchParams.get('genre') || 'All'}
				>
					<option value={'All'}>All</option>
					{genres.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
				</select>
				<button onClick={handleOrder}>
					{searchParams.get('order') === 'desc' ? 'Year Ascending' : 'Year Descending'}
				</button>
			</div>
			{loading ? (
				<div className='movie-library__loading'>
					<p>Loading...</p>
					<p>Fetched {fetchCount} times</p>
				</div>
			) : (
				<ul className='movie-library__list'>
					{moviesFiltered.map((movie) => (
						<li key={movie.id} className='movie-library__card'>
							<img src={movie.posterUrl} alt={movie.title} />
							<ul className='movie-library__description'>
								<li>{movie.title}</li>
								<li>{movie.genres.join(', ')}</li>
								<li>{movie.year}</li>
							</ul>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
