import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import {
    addEvaluationCriteriaScale,
    removeEvaluationCriteriaScale,
    updateEvaluationCriteria
} from "../../store/slices/rubricSlice.js";
import EditEventScale from "./edit_event_scale.jsx";


const EditEventRubric = ({rubric}) => {

    // console.log("------------EditEventRubric----------------   obj", rubric)
    const dispatch = useDispatch()

    // use state for storing the evaluation criteria object. incl. the scales
    const [criteriaForm, setCriteriaForm] = useState({
        uuid: '',
        name: '',
        description: '',
        scales: [],
    })

    const [scales, setScales] = useState(rubric.scales)

    // const [addedCriteriaForm, setAddedCriteriaForm] = useState({
    //     uuid: uuidv4(),
    //     name: '',
    //     description: '',
    //     scales: [],
    // })


    const [addedScaleForm, setAddedScaleForm] = useState({
        uuid: uuidv4(),
        value: '',
        description: '',
    })

    useEffect(() => {

        setCriteriaForm(rubric)
        // console.log(" $$$$$$$$$$$$$$EditEventRubric$$$$$$$$$$$$$$$$$44   useEffect", criteriaForm)
    }, [])


    useEffect(() => {
        dispatch(updateEvaluationCriteria(criteriaForm))
    }, [criteriaForm]);


    const handleCriteriaChange = (e) => {
        const {name, value} = e.target
        setCriteriaForm({
            ...criteriaForm,
            [name]: value,
        })
    }

    const handleRemoveCriteria = (e) => {
        e.preventDefault()
        // checking if main fields were filled
        try {
            // storing the evaluation criteria obj in redux, the evaluation criteria scales are added in the reducer function
            // dispatch(removeEventEvaluationCriteria(criteriaForm))
        } catch (error) {
            console.error(error)
        } finally {
            // clearing the redux state for the evaluation criteria scales
            // dispatch(clearEventEvaluationCriteriaScales())
            // clearing the evaluation criteria form
            setCriteriaForm({
                uuid: uuidv4(),
                name: '',
                description: '',
                scales: [],
            })
        }
    }


// handling storing an scale in the redux eventSlice
    const handleAddScale = (e) => {
        e.preventDefault()
        dispatch(addEvaluationCriteriaScale(addedScaleForm))

        setScales([...scales, addedScaleForm]);

        setAddedScaleForm({
            uuid: uuidv4(),
            value: '',
            description: '',
        })
    }

    const handleScaleChange = (e) => {
        const {name, value} = e.target
        setAddedScaleForm({
            ...addedScaleForm,
            [name]: value,
        })
    }

    const handleRemoveScale = (uuid) => {
        setScales(prevScales =>
            prevScales.filter(scale => scale.uuid !== uuid));

        // setScales(scales.filter(scale => scale.uuid !== uuid));
        dispatch(removeEvaluationCriteriaScale(uuid));
    }

    return (
        <>
            <div className="flex shadow w-full flex-col items-center m-14   pt-5">
                <div className="m-5 mt-10">
                    <h3>
                        Criteria
                    </h3>
                </div>
                <div className="w-full sm:w-[40rem]">
                    <input
                        className="input shadow input-bordered"
                        type="text"
                        placeholder="Name"
                        value={criteriaForm.name}
                        name="name"
                        onChange={handleCriteriaChange}
                    ></input>
                </div>
                <div className="w-full sm:w-[40rem] m-3">
          <textarea
              className="input input-bordered shadow w-full sm:w-[40rem]"
              placeholder="Description"
              value={criteriaForm.description}
              name="description"
              onChange={handleCriteriaChange}
          ></textarea>
                </div>

                <div className=" mt-10">
                    <h3>
                        Scales
                    </h3>
                </div>
                <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3">
                    {/*changed from rubric.scales to state Scale*/}
                    {scales && scales.length > 0 && scales.map((scale) => (
                        <div key={scale.uuid}>
                            <EditEventScale obj={scale} deleteScale={() => handleRemoveScale(scale.uuid)}/>
                        </div>
                    ))}
                    <div className="flex w-1/2 flex-grow items-center">
                        <input
                            className="input shadow input-bordered"
                            type="number"
                            placeholder="Add value"
                            value={addedScaleForm.value}
                            name="value"
                            onChange={handleScaleChange}
                        />
                        <textarea
                            className="input input-bordered shadow flex w-full min-w-0 m-3"
                            placeholder="Add description"
                            value={addedScaleForm.description}
                            name="description"
                            onChange={handleScaleChange}
                        />
                    </div>
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={handleAddScale}
                        disabled={!addedScaleForm.value || !addedScaleForm.description}  // Button disabled if fields are empty
                    >
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke-width="1.5" stroke="green" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </div>
                    </button>
                </div>
                <div className="flex w-full justify-center flex-row items-center">
                    <button
                        className="btn btn-error m-10  shadow-xl"
                        onClick={handleRemoveCriteria}
                    >
                        Remove Criteria
                    </button>
                </div>
            </div>
        </>
    )
}

EditEventRubric.propTypes = {
    rubric: PropTypes.object // Add additional fields as necessary
};

export default EditEventRubric
