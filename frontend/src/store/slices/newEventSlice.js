import { createSlice } from '@reduxjs/toolkit'

const newEventSlice = createSlice({
  name: 'event',
  initialState: {
    eventInformation: {},
  },
  reducers: {
    setEventInformation: (state, action) => {
      state.eventInformation = action.payload
    },
  },
})

export const { setEventInformation } = newEventSlice.actions
export default newEventSlice.reducer
