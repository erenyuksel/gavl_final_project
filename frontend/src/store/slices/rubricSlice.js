import {createSlice} from '@reduxjs/toolkit'

const rubricSlice = createSlice({
    name: 'rubric',
    initialState: {
        evaluationCriteria: [],
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
                // console.log("^^^^^^^^^^^^^^^^ELSE &&&&   updateEventEvaluationCriteria", state.evaluationCriteria)
            }
        },


        // removes an evaluation criteria from the list, not used yet
        removeEvaluationCriteria: (state, action) => {
            const newArr = state.eventEvaluationCriteria.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.eventEvaluationCriteria = newArr
        },


        // adding the evaluation criteria scales to the evaluation criteria obj and then storing it in the arr
        addEvaluationCriteriaScale: (state, action) => {

  //          console.log("SLICE ----- ADD---- ", action.payload, state.evaluationCriteria)

             const addedCriteriaScale = state.evaluationCriteria.map(crit => {
                if (crit.scales) {
                    const updatedScales = [...crit.scales, action.payload];
                    return {...crit, scales: updatedScales};
                } else {
                    crit['scales'] = action.payload;
                    return crit;
                }
            });

             state.evaluationCriteria = addedCriteriaScale

     //        console.log("SLICE ----- ADD-- AFTER -- uuid", addedCriteriaScale)
        },


        removeEvaluationCriteriaScale: (state, action) => {
     //       console.log("SLICE ----- REMOVE---- uuid", action.payload, state.evaluationCriteria)

            const removedCriteriaScale = state.evaluationCriteria.map(crit => {
                if (crit.scales) {
                    const updatedScales = crit.scales.filter(scale => scale.uuid !== action.payload);
                    return {...crit, scales: updatedScales};
                }
                return crit;
            });

            state.evaluationCriteria = removedCriteriaScale
      //      console.log("SLICE ----- REMOVE-- AFTER -- uuid", state.eventEvaluationCriteria)
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
          //  console.log("...................................important moment payload", action.payload)
            state.evaluationCriteria = updatedCriteria;
         //   console.log("...................................important moment 2 updatedCriteria", updatedCriteria)
        }
    },
})
export const {
    clearEvaluationCriteria,
    updateEvaluationCriteria,
    removeEvaluationCriteria,
    addEvaluationCriteriaScale,
    updateEvaluationCriteriaScale,
    updateEvaluationCriteriaField,
    removeEvaluationCriteriaScale
} = rubricSlice.actions
export default rubricSlice.reducer
