import {createSlice} from '@reduxjs/toolkit'

const rubricSlice = createSlice({
    name: 'rubric',
    initialState: {
        evaluationCriteria: [],
        evaluationCriteriaScale: [],
    },
    reducers: {

        updateEvaluationCriteriaField: (state, action) => {
            const {field, value, id} = action.payload;
            state.evaluationCriteria[id][field] = value//???

        },

        // adds a new obj to the event project structure arr, is used to define the structur of the information the contestants hold
        updateEvaluationCriteria: (state, action) => {

            if (Array.isArray(state.eventEvaluationCriteria)) {
                state.evaluationCriteria = [...state.evaluationCriteria, action.payload];
            } else {
                // If not an array, initialize it as an array with the current payload
                state.evaluationCriteria = [action.payload];
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

        updateEvaluationCriteriaScale: (state, action) => {

            const updatedCriteria = state.evaluationCriteria.map(crit => {
                if (crit.scales) {
                    const updatedScales = crit.scales.map(scale => {
                        if (scale.uuid === action.payload.uuid) {
                            return {...scale, value: action.payload.value, description: action.payload.description};
                        }
                        return scale;
                    });
                    return {...crit, scales: updatedScales};
                }
            });

            // setCriteria(updatedCriteria);
            state.evaluationCriteria = updatedCriteria;
        }
    },
})
export const {
    clearEvaluationCriteria,
    updateEvaluationCriteria,
    removeEvaluationCriteria,
    addScaleEvaluationCriteria,
    updateEvaluationCriteriaScale,
    clearEvaluationCriteriaScales,
    updateEvaluationCriteriaField,
    removeEvaluationCriteriaScale
} = rubricSlice.actions
export default rubricSlice.reducer
