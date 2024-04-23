import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  judges: [],
}

const judgesSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {
    setJudges: (state, action) => {
      state.judges = action.payload
    },
    addJudge: (state, action) => {
      state.judges.push(action.payload)
    },
    removeJudge: (state, action) => {
      state.judges = state.judges.filter((judge) => judge.id !== action.payload)
    },
  },
})

export const { setJudges, addJudge, removeJudge } = judgesSlice.actions
export default judgesSlice.reducer
