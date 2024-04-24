import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  evaluation: {},
  
}

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setEvaluation: (state, action) => {
      state.evaluation = action.payload
    },
  },
})

export const { setEvaluation } = evaluationSlice.actions
export default evaluationSlice.reducer