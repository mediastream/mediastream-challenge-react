export const cartReducer = (state = [], action) => {

    switch (action?.type) {
        case 'addCart':

            let shouldMovieSaved = state.find(({ id }) => id === action.payload.id);

            if (!!shouldMovieSaved) {
                return state.map(movie => {
                    if (movie.id === shouldMovieSaved.id) {
                        return {
                            ...movie,
                            quantity: movie.quantity + 1
                        }
                    } else {
                        return movie;
                    }
                });

            }

            return [...state, action.payload];

        case 'increment':
            return state.map(movie => {
                if (movie.id === action.payload) {
                    return {
                        ...movie,
                        quantity: movie.quantity + 1
                    }
                } else {
                    return movie;
                }
            });

        case 'decrement':
            return state.map(movie => {
                if (movie.id === action.payload) {
                    return {
                        ...movie,
                        quantity: movie.quantity - 1
                    }
                } else {
                    return movie;
                }
            });

        case 'delete':
            return state.filter(movie => movie.id !== action.payload);

        default:

            return state;
    }
}