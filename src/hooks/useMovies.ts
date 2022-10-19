import React from 'react'
import { useState } from 'react'
import { API } from '../constants'
import { Movie } from '../models/Movie.model'
import useFetch from './useFetch'

interface IState {
  movies: Movie[]
  genres: string[]
  fetchCount: number
  selectedGenre: string
  order: number
}

const initialState = {
  movies: [],
  genres: [],
  fetchCount: 1,
  selectedGenre: '',
  order: 1,
} as IState

export const useMovies = () => {
  const [{ order, selectedGenre, fetchCount }, setState] = useState<IState>(initialState)

  const changeState = (key: string, value: any) => {
    setState(oldState => ({ ...oldState, [key]: value }))
  }

  const genresServiceCallback = React.useCallback(() => fetch(`${API}/genres`), [])

  const { loading: loadingGenres, data: genres, refetch } = useFetch<any[]>(genresServiceCallback)

  const movieServiceCallback = React.useCallback(
    () =>
      fetch(
        `${API}/movies?_limit=50&genres_like=${selectedGenre}&_sort=year&_order=${
          order > 0 ? 'asc' : 'desc'
        }`,
      ),
    [order, selectedGenre],
  )

  const { loading: loadingMovies, data: movies } = useFetch<Movie[]>(movieServiceCallback)

  const isReady = !loadingGenres && !loadingMovies

  const forceRefresh = React.useCallback(
    (callBack: () => void) => {
      changeState('fetchCount', fetchCount + 1)
      callBack()
      refetch()
    },
    [fetchCount, refetch],
  )

  const setSelectedGenre = (value: string) => {
    forceRefresh(() => changeState('selectedGenre', value))
  }

  const toggleOrder = () => {
    forceRefresh(() => changeState('order', order * -1))
  }

  return {
    genres,
    movies,
    fetchCount,
    order,
    setSelectedGenre,
    toggleOrder,
    loading: !isReady,
  }
}
