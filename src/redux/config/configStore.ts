import { configureStore } from '@reduxjs/toolkit';
import postModalTogglerSlice from '../modules/writeAPostModalToggler';
import saveDetailBucketSlice from '../modules/detailBucketStore';

const content = {
  reducer: {
    postModalToggle: postModalTogglerSlice.reducer,
    savedBucket: saveDetailBucketSlice.reducer,
  },
};

const store = configureStore(content);

export default store;
