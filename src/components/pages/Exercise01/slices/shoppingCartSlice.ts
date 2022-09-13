import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieShoppingCart } from '../interfaces/Movie';

interface State {
  moviesSelected: Array<MovieShoppingCart>;
}

const initialState: State = {
  moviesSelected: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MovieShoppingCart>) => {
      state.moviesSelected = state.moviesSelected.concat(action.payload);
    },
    plusQuantityToCart: (state, action: PayloadAction<{ movieId: number }>) => {
      state.moviesSelected = state.moviesSelected
        .map((e) => e.id === action.payload.movieId ? { ...e, quantity: e.quantity + 1 } : e)
    },
    minusQuantityToCart: (state, action: PayloadAction<{ movieId: number }>) => {
      const movie = state.moviesSelected.find((e) => e.id === action.payload.movieId);

      if (movie?.quantity === 1) {
        state.moviesSelected = state.moviesSelected.filter((e) => e.id !== action.payload.movieId);
      }

      state.moviesSelected = state.moviesSelected.map((e) => e.id === action.payload.movieId ? { ...e, quantity: e.quantity - 1 } : e)
    },
  },
});

export const {
  addToCart,
  plusQuantityToCart,
  minusQuantityToCart,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
