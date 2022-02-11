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
  },
})
export const { setUserData, deleteUserData } = authSlice.actions

export const getUserData = (state) => state.auth.userData

export default authSlice.reducer
