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


// eslint-disable-next-line react/prop-types
const EditEventRubric = ({rubric, removeRubric, addRubric, isDisabled}) => {

    const [isDisabledState, setIsDisabledState] = useState(!!isDisabled);
    // console.log("------------EditEventRubric----------------   obj", isDisabledState, isDisabled)
    const dispatch = useDispatch()

    // use state for storing the evaluation criteria object. incl. the scales
    const [criteriaForm, setCriteriaForm] = useState({
        uuid: uuidv4(),
        name: '',
        description: '',
        scales: [],
    })

    const [scales, setScales] = useState(rubric.scales)
    // console.log("SCALES---------- get scale--", scales)

    const [addedScaleForm, setAddedScaleForm] = useState({
        uuid: uuidv4(),
        value: '',
        description: '',
    })

    useEffect(() => {
        //console.log(" $$..........EditEventRubric...............   useEffectv RuBRIC", rubric)
        setCriteriaForm(rubric)
        //console.log(" $$..........EditEventRubric...............   useEffect", criteriaForm)
    }, [])


    useEffect(() => {
        //console.log(" ==========================  useEffectv criteriaForm", criteriaForm)
        if (criteriaForm.uuid !== '' && criteriaForm.name !== '') {
            //console.log("  ==========================  useEffectv criteriaForm ----- INSIDE ")
            dispatch(updateEvaluationCriteria(criteriaForm))
        }
    }, [criteriaForm]);


    const handleCriteriaChange = (e) => {
        const {name, value} = e.target
        setCriteriaForm({
            ...criteriaForm,
            [name]: value,
        })
    }

    const handleRemoveCriteria = () => {
        removeRubric()
    }

    const handleAddCriteria = () => {
        setCriteriaForm({
            uuid: uuidv4(),
            name: '',
            description: '',
            scales: [],
        })
        setScales([]);
        // console.log("-------------------REMOVE SCALES", scales)

        addRubric()
    }

// handling storing a scale in the redux eventSlice
    const handleAddScale = () => {
        dispatch(addEvaluationCriteriaScale({crit_uuid: criteriaForm.uuid, scale_form: addedScaleForm}));

        setScales([...scales, addedScaleForm]);

        setAddedScaleForm({
            uuid: uuidv4(),
            value: '',
            description: '',
        })

        // console.log("SCALES-----------add scale--", scales)
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
        <div className='flex flex-col justify-between card shadow-lg p-5'>
            {/*<div className="flex shadow w-full flex-col items-center m-14 pt-5">*/}
            <h3>
                Criteria
            </h3>
            <div className="w-full">
                <input
                    className="input shadow input-bordered"
                    type="text"
                    placeholder="Name"
                    value={criteriaForm.name}
                    name="name"
                    onChange={handleCriteriaChange}
                    readOnly={isDisabledState}
                ></input>
            </div>
            <div className="w-full my-3">
          <textarea
              className="input input-bordered shadow w-full"
              placeholder="Description"
              value={criteriaForm.description}
              name="description"
              onChange={handleCriteriaChange}
              readOnly={isDisabledState}
          ></textarea>
            </div>

            <div className=" mt-10">
                <h3>
                    Scales
                </h3>
            </div>
            <div className="flex flex-wrap items-center w-full">
                {/*changed from rubric.scales to state Scale*/}
                {scales && scales.length > 0 && scales.map((scale) => (
                    <div className="w-full" key={scale.uuid}>
                        <EditEventScale obj={scale} deleteScale={() => handleRemoveScale(scale.uuid)} isDisabled={isDisabledState}/>
                    </div>
                ))}
                {!isDisabledState && (
                    <>
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
                                     strokeWidth="1.5" stroke="green" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </div>
                        </button>
                    </>
                )}
            </div>
            {rubric && rubric.name ? (
                <div className="flex w-full justify-center flex-row items-center">
                    <button disabled={isDisabledState}
                            className="btn btn-error m-4  shadow-xl"
                            onClick={handleRemoveCriteria}
                    >
                        Remove Criteria
                    </button>
                </div>) : (
                <div className="flex w-full justify-center flex-row items-center">
                    <button
                        disabled={!criteriaForm.name || !criteriaForm.description}
                        className="btn btn-success m-4  shadow-xl"
                        onClick={handleAddCriteria}
                    >
                        Add Criteria
                    </button>
                </div>)
            }
        </div>
    )
}

EditEventRubric.propTypes = {
  rubric: PropTypes.object.isRequired, // Define rubric prop as an object and mark it as required
  removeRubric: PropTypes.func, // Define removeRubric prop as a function and mark it as required
  addRubric: PropTypes.func, // Define addRubric prop as a function and mark it as required
  isDisabled: PropTypes.bool.isRequired // Define isDisabled prop as a boolean (optional)
};

export default EditEventRubric
