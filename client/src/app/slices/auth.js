import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    deleteUserData: (state) => {
      state.userData = null
    },
    getUserData: (state) => state.auth.userData,
  },
})
export const { setUserData, deleteUserData, getUserData } = authSlice.actions

export default authSlice.reducer
