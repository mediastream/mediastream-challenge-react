import { useEffect, useState } from "react";

export default function useGetMovies() {
  const [data, setData] = useState([])
  const [movies, setMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moviesGenres, setMoviesGenres] = useState({ genres:[], value: ''});
  const [movieGen, setMovieGen] = useState('');
  const [order, setOrder] = useState(true);

  useEffect(() => {
    handleMovieFetch()
  }, [])

  useEffect(() => {
    if(movieGen.length === 0) return
    onChangeGenre(movieGen);
  }, [movieGen]);

  useEffect(() => {
    handleFilterMovies(data);
  }, [data])


  const handleMovieFetch = () => {
    setLoading(true)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  const selectGenre = (value) => {
    setMovieGen(value);
  }

  const handleFilterMovies = (array) => {
    const genresMovies = getGenresMovies(array);
    setMoviesGenres([...genresMovies]);
    const moviesFilter = genresMovies.map(item => {
      return {
        genre: item,
        movies: getMoviesGenre(item)
      }
    });
    if(moviesFilter.length > 0 ) selectGenre(moviesFilter[0].genre)
    setFilterMovies([...moviesFilter]);
  }

  const onChangeGenre = (genre) => {
    const itemMovies = filterMovies.filter(item => item.genre === genre);
    setMovies([...itemMovies[0].movies])
  }

  const getMoviesGenre = (genre) => {
    const moviesGenre = data.filter(item => item.genres.includes(genre));
    return orderDesending(moviesGenre);
  }

  const getGenresMovies = (array) => {
    const movieGenre = array.map(item => item.genres);
    let genresMov = [];
    movieGenre.forEach(item => {
      genresMov = [...genresMov, ...item];
    });
    genresMov = deleteDuplicateArray(genresMov);
    return genresMov;
  }

  const changeOrder = () => {
    if(order ){
      orderAscending(movies)
    } else{
      orderDesending(movies)
    }
    setOrder(!order);
  }

  const orderAscending = ( array ) => {
    const newArray = array.sort((a, b) => parseFloat(a.year) - parseFloat(b.year))
    return newArray;
  }

  const orderDesending = (array ) => {
    const newArray = array.sort((a, b) => parseFloat(b.year) - parseFloat(a.year))
    return newArray;
  }

  const deleteDuplicateArray = (array) => {
    const newArray = [...new Set(array)];
    return newArray;
  } 

  return {
    movies,
    loading,
    moviesGenres,
    selectGenre,
    changeOrder,
    order
  }

}
