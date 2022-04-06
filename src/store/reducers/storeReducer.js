import { actionStoreTypes as actionTypes } from "../actions";

export function storeReducer(state, action) {
  switch (action.type) {
    case actionTypes.addToCart: {
      const cardIds = state.cart.map((item) => item.id);
      if (cardIds.includes(action.movie.id)) {
        return {
          cart: state.cart.map((item) => {
            if (item.id === action.movie.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      }

      return {
        cart: [].concat(state.cart, [{ ...action.movie, quantity: 1 }]),
      };
    }
    case actionTypes.removeFromCart: {
      return {
        cart: state.cart
          .map((item) => {
            if (item.id === action.item.id) {
              if(item.quantity - 1 > 0) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return null;
              }
            }
            return item
          })
          .filter((item) => item !== null),
      };
    }
    case actionTypes.increaseCart: {
      return {
        cart: state.cart.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
