import { configureStore } from '@reduxjs/toolkit';
import postModalTogglerSlice from '../modules/writeAPostModalToggler';
import uploadPostImageSlice from '../modules/uploadPostImage';

const content = {
  reducer: {
    postModalToggle: postModalTogglerSlice.reducer,
    uploadedPostImage: uploadPostImageSlice.reducer,
  },
};

const store = configureStore(content);

export default store;
