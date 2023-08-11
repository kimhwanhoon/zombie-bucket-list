import { configureStore } from '@reduxjs/toolkit';
import postModalTogglerSlice from '../modules/writeAPostModalToggler';
import saveDetailBucketSlice from '../modules/detailBucketStore';
import editPostModalTogglerSlice from '../modules/editPostModalToggler';

const content = {
  reducer: {
    postModalToggle: postModalTogglerSlice.reducer,
    savedBucket: saveDetailBucketSlice.reducer,
    editModalToggle: editPostModalTogglerSlice.reducer,
  },
};

const store = configureStore(content);

export default store;
