import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    avatar: null,
  },
  reducers: {
    authLogin: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatar = action.payload.avatar
    }
  }
})

export const { authLogin } = userSlice.actions

export default userSlice.reducer