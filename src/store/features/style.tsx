import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import colorType from 'static/types/color';
import {getTheme} from 'static/color/themeColor'

const initialState: { style: colorType } = { style:getTheme(true) };

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    changeStyle: (state, action: PayloadAction<boolean>) => {
      state.style=getTheme(action.payload);
    },
  },
});

export const { changeStyle } = styleSlice.actions;
export const style = (state: RootState) => state.style;
export default styleSlice.reducer;
