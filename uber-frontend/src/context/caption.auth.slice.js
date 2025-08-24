import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status:false,
  user:null
};

const captionAuthSlice = createSlice({
  name: 'captionAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload
      console.log(state.user)
    },
    logout: (state) => {
      state.status=false
      state.user = null;
    }
  },
});

export const { login, logout } = captionAuthSlice.actions;

export default captionAuthSlice.reducer;
