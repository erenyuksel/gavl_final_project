import {createSlice} from '@reduxjs/toolkit'

const rubricSlice = createSlice({
    name: 'rubric',
    initialState: {
        evaluationCriteria: [],
        evaluationCriteriaScales: [],
    },
    reducers: {

        updateEvaluationCriteriaField: (state, action) => {
            const {field, value, id} = action.payload;
            state.evaluationCriteria[id][field] = value//???

            console.log("^^^^^^^^^^^^^^^^updateEventEvaluationCriteriaField", field, value, id)
        },

        // adds a new obj to the event project structure arr, is used to define the structur of the information the contestants hold
        updateEvaluationCriteria: (state, action) => {

            if (Array.isArray(state.eventEvaluationCriteria)) {
                state.evaluationCriteria = [...state.evaluationCriteria, action.payload];
                console.log("^^^^^^^^^^^^^^^^IF  &&&&&&  updateEventEvaluationCriteria", state.evaluationCriteria)
            } else {
                // If not an array, initialize it as an array with the current payload
                state.evaluationCriteria = [action.payload];
                console.log("^^^^^^^^^^^^^^^^ELSE &&&&   updateEventEvaluationCriteria", state.evaluationCriteria)
            }
        },


        // adding the evaluation criteria scales to the evaluation criteria obj and then storing it in the arr
        addScaleEvaluationCriteria: (state, action) => {
            const newObj = action.payload
            newObj['scales'] = state.evaluationCriteriaScales
            state.evaluationCriteria = [...state.evaluationCriteria, newObj]
        },


        // removes an evaluation criteria from the list, not used yet
        removeEvaluationCriteria: (state, action) => {
            const newArr = state.eventEvaluationCriteria.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.eventEvaluationCriteria = newArr
        },


        clearEvaluationCriteria: (state) => {
            state.eventEvaluationCriteria = []
        },


        // adds a evaluation criteria scale to the redux store, is then used to complete the evaluation criteria obj
        updateEvaluationCriteriaScales: (state, action) => {
            state.eventEvaluationCriteriaScales = [...state.eventEvaluationCriteriaScales, action.payload]
        },


        // removes all the evaluation criteria scales from the redux state when a criteria is added so it can hold new scales for the next criteria
        clearEvaluationCriteriaScales: (state) => {
            state.eventEvaluationCriteriaScales = []
        },
    },
})

export const {
    clearEvaluationCriteria,
    updateEvaluationCriteria,
    removeEvaluationCriteria,
    addScaleEvaluationCriteria,
    updateEvaluationCriteriaScales,
    clearEvaluationCriteriaScales,
    updateEvaluationCriteriaField,
    removeEvaluationCriteriaScale
} = rubricSlice.actions
export default rubricSlice.reducer
