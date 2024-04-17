import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import newEventSlice from './slices/newEventSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    event: newEventSlice,
  },
})

export default store
