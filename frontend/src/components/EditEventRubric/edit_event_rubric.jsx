import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    clearEventEvaluationCriteriaScales,
    updateEventEvaluationCriteria,
    updateEventEvaluationCriteriaScales,
} from '../../store/slices/rubricSlice'
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";


const EditEventRubric = ({obj}) => {

    const criteriaSlice = useSelector((state) => state.rubric.eventEvaluationCriteria.find(crit => crit.uuid === obj))
    const scaleSlice = criteriaSlice.scales
    //useSelector((state) => state.rubric.eventEvaluationCriteriaScales)
    const dispatch = useDispatch()

    // use state for storing the evaluation criteria object. incl. the scales
    const [criteriaForm, setCriteriaForm] = useState({
        name: '',
        description: '',
        scales: [],
    })

    // const [addedCriteriaForm, setAddedCriteriaForm] = useState({
    //     uuid: uuidv4(),
    //     name: '',
    //     description: '',
    //     scales: [],
    // })

    // useState for storing the form input of a ev. criteria scale
    const [scaleForm, setScaleForm] = useState({
        value: '',
        description: '',
    })

    const [addedScaleForm, setAddedScaleForm] = useState({
        uuid: uuidv4(),
        value: '',
        description: '',
    })

    useEffect(() => {
        if (criteriaSlice && criteriaSlice.scales) {
            setCriteriaForm(criteriaSlice)
            setScaleForm(scaleSlice)
        }
        console.log("$$$$$$$$$$$$$$EditEventRubric$$$$$$$$$$$$$$$$$44   useEffect", scaleForm)
    }, [criteriaSlice])

    // handling form values of the evaluation criteria scales in a usestate
    const handleScaleInput = (e) => {
        const {name, value} = e.target
        setScaleForm({
            ...scaleForm,
            [name]: value,
        })
    }
    // handling form values of the main fields of the evaluation criteria
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setCriteriaForm({
            ...criteriaForm,
            [name]: value,
        })
    }

    const handleAddCriteria = (e) => {
        e.preventDefault()
        // checking if main fields were filled
        if (!criteriaForm.name || !criteriaForm.description) {
            console.error('Please input Evaluation Criteria information')
        } else {
            try {
                // storing the evaluation criteria obj in redux, the evaluation criteria scales are added in the reducer function
                dispatch(updateEventEvaluationCriteria(criteriaForm))
            } catch (error) {
                console.error(error)
            } finally {
                // clearing the redux state for the evaluation criteria scales
                dispatch(clearEventEvaluationCriteriaScales())
                // clearing the evaluation criteria form
                setCriteriaForm({
                    uuid: uuidv4(),
                    name: '',
                    description: '',
                    scales: [],
                })
            }
        }
    }

    // handling storing an scale in the redux eventSlice
    const handleAddScale = (e) => {
        e.preventDefault()
        dispatch(updateEventEvaluationCriteriaScales(scaleForm))
        setScaleForm({
            uuid: uuidv4(),
            value: '',
            description: '',
        })
    }

    return (
        <>
            <div className="flex shadow w-full flex-col items-center m-14   pt-5">
                <h2>Updating Evaluation Criteria</h2>
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
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="w-full sm:w-[40rem] m-3">
          <textarea
              className="input input-bordered shadow w-full sm:w-[40rem]"
              placeholder="Description"
              value={criteriaForm.description}
              name="description"
              onChange={handleInputChange}
          ></textarea>
                </div>

                <div className=" mt-10">
                    <h3>
                        Scale
                    </h3>
                </div>

                {scaleForm && scaleForm.length && scaleForm.map((scale) => (
                    <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3" key={scale.uuid}>
                        <div className="flex w-1/2 flex-grow items-center">
                            <input
                                className="input shadow input-bordered"
                                type="number"
                                placeholder="Value"
                                value={scale.value}
                                name="value"
                                onChange={handleScaleInput}
                            />
                            <textarea
                                className="input input-bordered shadow flex w-full min-w-0 m-3"
                                placeholder="Description"
                                value={scale.description}
                                name="description"
                                onChange={handleScaleInput}
                            />
                        </div>
                        <button
                            className="btn btn-success  m-3 shadow-xl"
                            onClick={handleAddScale}
                        >
                            Update scale
                        </button>
                        <button
                            className="btn btn-error  m-3 shadow-xl"
                            onClick={handleAddScale}
                        >
                            Remove scale
                        </button>
                    </div>
                ))}

                <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3">
                    <div className="flex w-1/2 flex-grow items-center">
                        <input
                            className="input shadow input-bordered"
                            type="number"
                            placeholder="Value"
                            value={addedScaleForm.value}
                            name="value"
                            onChange={handleScaleInput}
                        />
                        <textarea
                            className="input input-bordered shadow flex w-full min-w-0 m-3"
                            type="text"
                            placeholder="Description"
                            value={addedScaleForm.description}
                            name="description"
                            onChange={handleScaleInput}
                        />
                    </div>
                    <button
                        className="btn bg-primary m-3 shadow-xl"
                        onClick={handleAddScale}
                    >
                        Add scale
                    </button>
                </div>

                <div className="flex w-full justify-center flex-row items-center">
                    <button
                        className="btn m-10  btn-success shadow-xl"
                        onClick={handleAddCriteria}
                    >
                        Update Criteria
                    </button>
                    <button
                        className="btn btn-error m-10  shadow-xl"
                        onClick={handleAddCriteria}
                    >
                        Remove Criteria
                    </button>
                </div>
            </div>
        </>
    )
}

EditEventRubric.propTypes = {
    obj: PropTypes.string // Add additional fields as necessary
};

export default EditEventRubric
