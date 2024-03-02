import { configureStore } from '@reduxjs/toolkit';
import goodsSliceReducer from './goods';

export default configureStore({
  reducer: {
    goodsSlice: goodsSliceReducer,
  },
});
