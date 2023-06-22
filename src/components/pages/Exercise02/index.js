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
import "./assets/loader.css";
import { useEffect, useState } from "react";
import {getGenres, getMovies} from "./providers/movies.provider";
import Header from "./components/header";
import Card from "./components/card";

export default function Exercise02 () {
    const [genres, setGenres] = useState([])
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        genre: "",
        sort: "asc"
    })

    const getInitData = async () => {
        setLoading(true)
        const [movies, genres] = await Promise.all([
            getMovies({}),
            getGenres()
        ])
        setMovies(movies)
        setGenres(genres)
        setLoading(false)
    }

    const filterAndSortMovies = async data => {
        setParams({...params, ...data})
    }

    useEffect(async () => {
        await getInitData()
    }, [])

    useEffect(async () => {
        setLoading(true)
        const movies = await getMovies(params)
        setMovies(movies)
        setLoading(false)
    }, [params])

    return (
        <section className="movie-library">
            <Header
                loading={loading}
                genres={genres}
                params={params}
                filterAndSortMovies={filterAndSortMovies}
            />
            <div className="movie-library__list">
                {
                    !loading
                        ? movies.map(movie => (
                            <Card
                                movie={movie}
                            />
                        ))
                        : (
                            <div className="loader-cont">
                                <div className="loader"></div>
                            </div>
                        )
                }
            </div>
        </section>
    )
}