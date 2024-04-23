import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import eventReducer from './slices/newEventSlice'
import evaluationReducer from './slices/evaluationSlice'
import judgesReducer from './slices/judgesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    evaluation: evaluationReducer,
    judges: judgesReducer,
  },
})

export default store
