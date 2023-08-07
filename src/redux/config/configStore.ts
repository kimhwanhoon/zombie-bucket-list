import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from '../modules/example';

const content = {
  reducer: {
    example: exampleSlice.reducer,
  },
};

const store = configureStore(content);

export default store;
