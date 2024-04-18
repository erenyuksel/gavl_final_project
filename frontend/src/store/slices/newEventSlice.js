import { createSlice } from '@reduxjs/toolkit'

const newEventSlice = createSlice({
  name: 'event',
  initialState: {
    eventInformation: {},
    eventProjectStructure: [],
  },
  reducers: {
    setEventInformation: (state, action) => {
      state.eventInformation = action.payload
    },
    updateEventProjectStructure: (state, action) => {
      state.eventProjectStructure = [...state.eventProjectStructure, action.payload]
      console.log('updatedslice', state.eventProjectStructure)
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
    }
  },
})

export const { setEventInformation, updateEventProjectStructure, removeProjectStructureItem, moveProjectStructureItemUp, moveProjectStructureItemDown } = newEventSlice.actions
export default newEventSlice.reducer
