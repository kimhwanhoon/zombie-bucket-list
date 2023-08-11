import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StatusLabelType {
  label: string | undefined;
}

const initialState: StatusLabelType = {
  label: undefined,
};

export const statusLabelSlice = createSlice({
  name: 'stausLabel',
  initialState,
  reducers: {
    setStatusLabel: (state, action: PayloadAction<string | undefined>) => {
      console.log('진행상태', state);

      state.label = action.payload;
    },
  },
});

export const { setStatusLabel } = statusLabelSlice.actions;
export default statusLabelSlice;
