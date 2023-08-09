import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const content = {
  name: 'saveDetailBucketSlice',
  initialState: null as BucketList | null,
  reducers: {
    saveBucket: (
      state: BucketList | null,
      action: PayloadAction<BucketList | null>,
    ) => {
      console.log(action);
      return action.payload;
    },
  },
};

const saveDetailBucketSlice = createSlice(content);

export default saveDetailBucketSlice;
export const { saveBucket } = saveDetailBucketSlice.actions;
