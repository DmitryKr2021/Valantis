/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goods: [],
  brands: [],
  filterParams: {},
  pageNumber: 1,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    loadBrands: (state, { payload }) => {
      const { result } = payload;
      state.brands = Array.from(new Set(result));
    },
    setFilterParams: (state, { payload }) => {
      state.filterParams = payload;
    },
    loadItems: (state, { payload }) => {
      state.goods = payload;
    },
    pageToShow: (state, { payload }) => {
      state.pageNumber = payload;
    },
  },
});

export const { loadBrands, setFilterParams, loadItems, pageToShow } = goodsSlice.actions;
export default goodsSlice.reducer;
