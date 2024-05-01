import {createSlice} from '@reduxjs/toolkit'

const rubricSlice = createSlice({
    name: 'rubric',
    initialState: {
        eventEvaluationCriteria: [],
        eventEvaluationCriteriaScales: [],
    },
    reducers: {

        updateEventEvaluationCriteriaField: (state, action) => {
            const {field, value, id} = action.payload;
            state.eventEvaluationCriteria[id][field] = value//???

            console.log("^^^^^^^^^^^^^^^^updateEventEvaluationCriteriaField", field, value, id)
        },

        // adds a new obj to the event project structure arr, is used to define the structur of the information the contestants hold
        updateEventEvaluationCriteria: (state, action) => {

            if (Array.isArray(state.eventEvaluationCriteria)) {
                state.eventEvaluationCriteria = [...state.eventEvaluationCriteria, action.payload];
                console.log("^^^^^^^^^^^^^^^^IF  &&&&&&  updateEventEvaluationCriteria", state.eventEvaluationCriteria)
            } else {
                // If not an array, initialize it as an array with the current payload
                state.eventEvaluationCriteria = [action.payload];
                console.log("^^^^^^^^^^^^^^^^ELSE &&&&   updateEventEvaluationCriteria", state.eventEvaluationCriteria)
            }
        },


        // removes a field from the contestant data structure
        removeEventEvaluationCriteria: (state, action) => {
            const newArr = state.eventProjectStructure.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.eventProjectStructure = newArr
        },


        // clearing the project structure redux state after an event was created successfully
        clearEventProjectStructure: (state) => {
            state.eventProjectStructure = []
        },


        // adding the evaluation criteria scales to the evaluation criteria obj and then storing it in the arr
        addScaleEventEvaluationCriteria: (state, action) => {
            const newObj = action.payload
            newObj['scales'] = state.eventEvaluationCriteriaScales
            state.eventEvaluationCriteria = [...state.eventEvaluationCriteria, newObj]
        },


        // removes an evaluation criteria from the list, not used yet
        removeEventEvaluationCriteriaScale: (state, action) => {
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
    updateEventEvaluationCriteriaScales,
    clearEventEvaluationCriteriaScales,
    addNewEventEvaluationCriteria,
    updateEventEvaluationCriteriaField,
    updateEventEvaluationCriteria,
    removeEventEvaluationCriteria,
    addScaleEventEvaluationCriteria,
    removeEventEvaluationCriteriaScale
} = rubricSlice.actions
export default rubricSlice.reducer
