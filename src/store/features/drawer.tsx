import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { show: boolean } = {
  show: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    changeShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { changeShow } = drawerSlice.actions;
export const drawer = (state: RootState) => state.drawer;
export default drawerSlice.reducer;
