import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const content = {
  name: 'uploadPostImage',
  initialState: null,
  reducers: {
    uploadPostImage: (state: any, action: any) => {
      console.log(action);
      return action.payload;
    },
  },
};

const uploadPostImageSlice = createSlice(content);

export default uploadPostImageSlice;
export const { uploadPostImage } = uploadPostImageSlice.actions;
