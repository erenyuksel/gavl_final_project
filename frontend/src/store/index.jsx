import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import eventReducer from './slices/newEventSlice'
import evaluationReducer from './slices/evaluationSlice'
import judgesReducer from './slices/judgesSlice'
import rubricReducer from './slices/rubricSlice'

const store = configureStore({

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/updateUserField'],  // Replace 'user/updateUserField' with your actual action type if different
                ignoredActionPaths: ['payload.timestamp', 'meta.arg'], // Specify any paths in actions to ignore
                ignoredPaths: ['user.user.avatar'],  // Specify any paths in the state to ignore
            },
        }),

    reducer: {
        user: userReducer,
        event: eventReducer,
        evaluation: evaluationReducer,
        judges: judgesReducer,
        rubric: rubricReducer,
    },
})

export default store
