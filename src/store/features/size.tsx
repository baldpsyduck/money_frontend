import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface sizeType{ width: number; height: number}

const initialState:sizeType  = {
    width:window.innerWidth,
    height:window.innerHeight
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    changeSize: (state, action: PayloadAction<sizeType>) => {
        state.width=action.payload.width;
        state.height=action.payload.height;
    },
  },
});

export const { changeSize } = sizeSlice.actions;
export const size = (state: RootState) => state.size;
export default sizeSlice.reducer;
