import {createSlice} from '@reduxjs/toolkit'

const newEventSlice = createSlice({
    name: 'event',
    initialState: {
        eventInformation: {},
        eventProjectStructure: [],
        eventEvaluationCriteria: [],
        eventEvaluationCriteriaScales: [],
    },
    reducers: {
        // stores the general event information in redux state
        setEventInformation: (state, action) => {
            state.eventInformation = action.payload
        },

        updateEventInformationField: (state, action) => {
            const {field, value} = action.payload;
            state.eventInformation[field] = value
        },

        // adds a new obj to the event project structure arr, is used to define the structur of the information the contestants hold
        updateEventProjectStructure: (state, action) => {
            state.eventProjectStructure = [...state.eventProjectStructure, action.payload]
        },
        // removes a field from the contestant data structure
        removeProjectStructureItem: (state, action) => {
            const newArr = state.eventProjectStructure.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.eventProjectStructure = newArr
        },
        // clearing the project structure redux state after an event was created successfully
        clearEventProjectStructure: (state) => {
            state.eventProjectStructure = []
        },
        // identifies an object in the array and reduces the index by one, so its higher in the list
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
        // identifies an object in the arr and increases the index by one, so the obj moves down in the list
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
            state.eventEvaluationCriteria = [...state.eventEvaluationCriteria, newObj]
        },
        // removes an evaluation criteria from the list, not used yet
        removeEventEvaluationCriteria: (state, action) => {
            const newArr = state.eventEvaluationCriteria.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.eventEvaluationCriteria = newArr
        },
        clearEventEvaluationCriteria: (state) => {
            state.eventEvaluationCriteria = []
        },
        // adds a evaluation criteria scale to the redux store, is then used to complete the evaluation criteria obj
        updateEventEvaluationCriteriaScales: (state, action) => {
            state.eventEvaluationCriteriaScales = [...state.eventEvaluationCriteriaScales, action.payload]
        },
        // removes all the evaluation criteria scales from the redux state when a criteria is added so it can hold new scales for the next criteria
        clearEventEvaluationCriteriaScales: (state) => {
            state.eventEvaluationCriteriaScales = []
        },
    },
})

export const {
    clearEventEvaluationCriteria,
    clearEventProjectStructure,
    setEventInformation,
    updateEventProjectStructure,
    removeProjectStructureItem,
    moveProjectStructureItemUp,
    moveProjectStructureItemDown,
    updateEventEvaluationCriteriaScales,
    clearEventEvaluationCriteriaScales,
    updateEventEvaluationCriteria,
    updateEventInformationField,
    removeEventEvaluationCriteria
} = newEventSlice.actions
export default newEventSlice.reducer
