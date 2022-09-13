import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../interfaces/Movie';

interface State {
    movieList: Array<Movie>;
    moviesFiltered: Array<Movie>;
}

const initialState: State = {
    movieList: [],
    moviesFiltered: []
};

const movieSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setMovieList: (state, action: PayloadAction<Array<Movie>>) => {
            state.movieList = action.payload;
            state.moviesFiltered = action.payload;
        },
        filterMovieListByGender: (state, action: PayloadAction<{ gender: string }>) => {
            state.moviesFiltered = state.movieList.filter((e) => e.genres.includes(action.payload.gender)).sort((a, b) => parseInt(b.year) - parseInt(a.year))
        },
        changeOrderDescendentMovieList: (state) => {
            state.moviesFiltered = state.moviesFiltered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        },
        changeOrderAscendentMovieList: (state) => {
            state.moviesFiltered = state.moviesFiltered.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        },
    },
});

export const { setMovieList,
    changeOrderAscendentMovieList,
    changeOrderDescendentMovieList,
    filterMovieListByGender } = movieSlice.actions;

export default movieSlice.reducer;
