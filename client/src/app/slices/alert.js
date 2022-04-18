import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alertData: {
      show: false,
      title: '',
      message: '',
      icon: '',
      onConfirm: () => {},
    },
  },
  reducers: {
    setAlertData: (state, action) => {
      state.alertData = action.payload
    },
    resetAlertData: (state) => {
      state.alertData = {
        show: false,
        title: '',
        message: '',
        icon: '',
        onConfirm: () => {},
      }
    },
    getAlertData: (state) => state.alert.alertData,
  },
})
export const { setAlertData, resetAlertData, getAlertData } = alertSlice.actions

export default alertSlice.reducer
