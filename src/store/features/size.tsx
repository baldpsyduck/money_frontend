import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface sizeType {
  width: number;
  height: number;
  zoom: number;
}

const initialState: sizeType = {
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: window.innerHeight < window.innerWidth ? 1 : window.innerWidth / window.innerHeight,
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    changeSize: (state, action: PayloadAction<Omit<sizeType, "zoom">>) => {
      const { width, height } = action.payload;
      state.width = width;
      state.height = height;
      state.zoom = width < height ? 1 : width / height;
    },
  },
});

export const { changeSize } = sizeSlice.actions;
export const size = (state: RootState) => state.size;
export default sizeSlice.reducer;
