import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      state.user[field] = value
   },
  },
})

export const { setUser, clearUser, setEmail , updateUserField} = userSlice.actions
export default userSlice.reducer
