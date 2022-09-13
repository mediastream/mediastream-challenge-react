import shoppingCartReducer from '../components/pages/Exercise01/slices/shoppingCartSlice';
import moviesReducer from '../components/pages/Exercise02/slices/movieSlice';
import { movieApi } from '../components/pages/Exercise02/slices/movieApiSlice';

const reducer = {
    shoppingCart: shoppingCartReducer,
    movies: moviesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
}

export default reducer;