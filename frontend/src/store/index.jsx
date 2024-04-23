import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import eventReducer from './slices/newEventSlice'
import judgesReducer from './slices/judgesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    judges: judgesReducer,
  },
})

export default store
