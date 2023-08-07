import { createSlice } from '@reduxjs/toolkit';

const content = {
  name: 'example',
  initialState: {},
  reducers: {
    exampleAction: (state: any, action: any) => {
      // 일단 any로 설정해 놨음.
      return state;
    },
  },
};

const exampleSlice = createSlice(content);

export default exampleSlice;
export const { exampleAction } = exampleSlice.actions;
