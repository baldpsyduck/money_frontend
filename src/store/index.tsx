import { configureStore } from '@reduxjs/toolkit';
import style from './features/style';
import drawer from './features/drawer';

const store = configureStore({
    reducer: {
        style:style,
        drawer:drawer,
    },
}); 

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store