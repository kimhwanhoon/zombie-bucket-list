import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const content = {
  name: 'BucketDetail/edit a post modal toggler',
  initialState: false,
  reducers: {
    editModalToggler: (state: any, action: PayloadAction<boolean>) =>
      action.payload,
  },
};

const editPostModalTogglerSlice = createSlice(content);

export default editPostModalTogglerSlice;
export const { editModalToggler } = editPostModalTogglerSlice.actions;
