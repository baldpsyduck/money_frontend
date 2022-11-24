import { configureStore } from '@reduxjs/toolkit';
import style from './features/style';
import drawer from './features/drawer';
import size from './features/size';

const store = configureStore({
    reducer: {
        style:style,
        drawer:drawer,
        size:size
    },
}); 

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store