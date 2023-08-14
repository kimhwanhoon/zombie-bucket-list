import { configureStore } from '@reduxjs/toolkit';
import postModalTogglerSlice from '../modules/writeAPostModalToggler';
import saveDetailBucketSlice from '../modules/detailBucketStore';
import editPostModalTogglerSlice from '../modules/editPostModalToggler';
import statusLabelSlice from '../modules/statusLabelSlice';

const content = {
  reducer: {
    postModalToggle: postModalTogglerSlice.reducer,
    savedBucket: saveDetailBucketSlice.reducer,
    editModalToggle: editPostModalTogglerSlice.reducer,
    statusLabel: statusLabelSlice.reducer,
  },
};

const store = configureStore(content);
export type RootState = ReturnType<typeof store.getState>;

export default store;
