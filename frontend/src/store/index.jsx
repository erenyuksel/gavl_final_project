import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import eventReducer from './slices/newEventSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
})

export default store
