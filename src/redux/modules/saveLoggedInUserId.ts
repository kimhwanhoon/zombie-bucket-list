import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '';

const content = {
  name: 'getCurrentUser',
  initialState,
  reducers: {
    saveLoggedInUserId: (state: string, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
};

const saveLoggedInUserIdSlice = createSlice(content);

export default saveLoggedInUserIdSlice;
export const { saveLoggedInUserId } = saveLoggedInUserIdSlice.actions;
//
