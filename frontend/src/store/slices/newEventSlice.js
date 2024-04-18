import { createSlice } from '@reduxjs/toolkit'

const newEventSlice = createSlice({
  name: 'event',
  initialState: {
    eventInformation: {},
    eventProjectStructure: [],
    eventEvaluationCriteria: [],
    eventEvaluationCriteriaScales: [],
  },
  reducers: {
    setEventInformation: (state, action) => {
      state.eventInformation = action.payload
    },
    updateEventProjectStructure: (state, action) => {
      state.eventProjectStructure = [...state.eventProjectStructure, action.payload]
    },
    removeProjectStructureItem: (state, action) => {
      const newArr = state.eventProjectStructure.filter(obj => {
        return obj.uuid !== action.payload
      })
      state.eventProjectStructure = newArr
    },
    moveProjectStructureItemUp: (state, action) => {
      const index = state.eventProjectStructure.findIndex(obj => obj.uuid === action.payload.uuid)
      if (index === 0) {
        console.error('It\'s the highest obj, you cant move this one up')
      } else {
        const temp = state.eventProjectStructure[index]
        state.eventProjectStructure[index] = state.eventProjectStructure[index - 1]
        state.eventProjectStructure[index - 1] = temp
      }
    },
    moveProjectStructureItemDown: (state, action) => {
      const index = state.eventProjectStructure.findIndex(obj => obj.uuid === action.payload.uuid)
      if (index >= state.eventProjectStructure.length - 1) {
        console.error('It\'s the last obj, you cant move this one down')
      } else {
        const temp = state.eventProjectStructure[index]
        state.eventProjectStructure[index] = state.eventProjectStructure[index + 1]
        state.eventProjectStructure[index + 1] = temp
      }
    },
    // adding the evaluation criteria scales to the evaluation criteria obj and then storing it in the arr
    updateEventEvaluationCriteria: (state, action) => {
      const newObj = action.payload
      newObj['scales'] = state.eventEvaluationCriteriaScales
      console.log(newObj)
      state.eventEvaluationCriteria = [...state.eventEvaluationCriteria, newObj]
    },
    removeEventEvaluationCriteria: (state, action) => {
      const newArr = state.eventEvaluationCriteria.filter(obj => {
        return obj.uuid !== action.payload
      })
      state.eventEvaluationCriteria = newArr
    },
    updateEventEvaluationCriteriaScales: (state, action) => {
      state.eventEvaluationCriteriaScales = [...state.eventEvaluationCriteriaScales, action.payload]
      console.log('Redux scales:',state.eventEvaluationCriteriaScales)
    },
    clearEventEvaluationCriteriaScales: (state) => {
      state.eventEvaluationCriteriaScales = []
    },

  },
})

export const { setEventInformation, updateEventProjectStructure, removeProjectStructureItem, moveProjectStructureItemUp, moveProjectStructureItemDown, updateEventEvaluationCriteriaScales, clearEventEvaluationCriteriaScales, updateEventEvaluationCriteria, removeEventEvaluationCriteria  } = newEventSlice.actions
export default newEventSlice.reducer
