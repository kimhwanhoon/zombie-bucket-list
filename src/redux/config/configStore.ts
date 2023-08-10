import { configureStore } from '@reduxjs/toolkit';
import postModalTogglerSlice from '../modules/writeAPostModalToggler';
import saveDetailBucketSlice from '../modules/detailBucketStore';
import saveLoggedInUserIdSlice from '../modules/saveLoggedInUserId';

const content = {
  reducer: {
    postModalToggle: postModalTogglerSlice.reducer,
    savedBucket: saveDetailBucketSlice.reducer,
    loggedInUserId: saveLoggedInUserIdSlice.reducer,
  },
};

const store = configureStore(content);

export default store;
