import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// root reducer
import reducer from './reducer';
import { middlewareApi } from './middlewareApi';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

// root redux types based on store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
