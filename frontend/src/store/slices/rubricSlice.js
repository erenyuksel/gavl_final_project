import {createSlice} from '@reduxjs/toolkit'

const rubricSlice = createSlice({
    name: 'rubric',
    initialState: {
        evaluationCriteria: [],
    },
    reducers: {

        setEvaluationCriteria: (state, action) => {
            state.evaluationCriteria = action.payload
        },

        // adds a new obj to the event project structure arr, is used to define the structur of the information the contestants hold
        updateEvaluationCriteria: (state, action) => {
            // console.log("^^^^^^^^^^^^^payload", action.payload)

            if (Array.isArray(state.evaluationCriteria)) {
                const search_result = state.evaluationCriteria.find((criteria) => criteria.uuid === action.payload.uuid)
                //console.log("^^^^^^^^^^^^^search res", search_result)

                if (typeof search_result === 'undefined') {
                    state.evaluationCriteria = [...state.evaluationCriteria, action.payload];
                    // console.log("^^^^^^^^^^^^^^^^IF  &&&&&&  updateEventEvaluationCriteria", state.evaluationCriteria)
                } else {
                    const updatedCriteria = state.evaluationCriteria.map(crit => {
                        if (crit.uuid === action.payload.uuid) {
                            return {
                                ...crit,
                                name: action.payload.name,
                                description: action.payload.description,
                                scales: action.payload.scales || []
                            };
                        }
                        return crit;
                    });
                    state.evaluationCriteria = updatedCriteria;
                    //console.log("^^^^^^^^^^^^^^^^ELSE &&&&&&  updatedCriteria", updatedCriteria)
                }
            } else {
                // If not an array, initialize it as an array with the current payload
                state.evaluationCriteria = [action.payload];
                // console.log("^^^^^^^^^^^^^^^^ELSE &&&&   updateEventEvaluationCriteria", state.evaluationCriteria)
            }
        },


        // removes an evaluation criteria from the list, not used yet
        removeEvaluationCriteria: (state, action) => {

            // console.log("SLICE ----- REMOVE-- BEFORE -- uuid", action.payload, state.evaluationCriteria)

            const newArr = state.evaluationCriteria.filter(obj => {
                return obj.uuid !== action.payload
            })
            state.evaluationCriteria = newArr

            // console.log("SLICE ----- REMOVE-- AFTER -- uuid", newArr)
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


        // adding the evaluation criteria scales to the evaluation criteria obj and then storing it in the arr
        addEvaluationCriteriaScale: (state, action) => {

            const {crit_uuid, scale_form} = action.payload;
            //console.log("-------------------SLICE ----- ADD---- ", crit_uuid, scale_form)
            //console.log("-------------------SLICE ----- state.evaluationCriteria ---- ", state.evaluationCriteria)

            const addedCriteriaScale = state.evaluationCriteria.map(crit => {
                // console.log("-------------------SLICE ----- crit add  ---- ", crit)
                if (crit.uuid === crit_uuid) {
                    if (crit.scales) {
                        const updatedScales = [...crit.scales, scale_form];
                        return {...crit, scales: updatedScales};
                    } else {
                        crit['scales'] = scale_form;
                        return crit;
                    }
                }
                return crit;
            });
            state.evaluationCriteria = addedCriteriaScale
            //console.log("SLICE ----- ADD-- AFTER -- uuid", addedCriteriaScale)
        },

        updateEvaluationCriteriaScale: (state, action) => {
            const updatedCriteria = state.evaluationCriteria.map(crit => {
                // console.log(" .......updateEvaluationCriteriaScale......           CRIT ", crit);
                if (typeof crit !== 'undefined' && typeof crit.scales !== 'undefined') {
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
    setEvaluationCriteria,
    updateEvaluationCriteria,
    removeEvaluationCriteria,
    addEvaluationCriteriaScale,
    updateEvaluationCriteriaScale,
    removeEvaluationCriteriaScale
} = rubricSlice.actions
export default rubricSlice.reducer
