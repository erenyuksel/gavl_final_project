import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import eventReducer from './slices/newEventSlice'
import evaluationReducer from './slices/evaluationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    evaluation: evaluationReducer,
  },
})

export default store
