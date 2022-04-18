import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryData: {
      id: '',
      description: '',
      name: '',
      image: '',
      content: '',
      updatedAt: '',
      createdAt: '',
    },
  },
  reducers: {
    setCategoryData: (state, action) => {
      state.categoryData = action.payload
    },
    resetCategoryData: (state) => {
      state.categoryData = {
        id: '',
        description: '',
        name: '',
        image: '',
        content: '',
        updatedAt: '',
        createdAt: '',
      }
    },
    getCategoryData: (state) => state.category.categoryData,
  },
})
export const { setCategoryData, resetCategoryData, getCategoryData } = categorySlice.actions

export default categorySlice.reducer
