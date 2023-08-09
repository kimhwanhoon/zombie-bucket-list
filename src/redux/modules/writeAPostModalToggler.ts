import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const content = {
  name: 'home/write a post modal toggler',
  initialState: false,
  reducers: {
    postModalToggler: (state: any, action: PayloadAction<boolean>) =>
      action.payload,
  },
};

const postModalTogglerSlice = createSlice(content);

export default postModalTogglerSlice;
export const { postModalToggler } = postModalTogglerSlice.actions;
