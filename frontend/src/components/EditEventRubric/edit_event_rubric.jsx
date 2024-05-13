import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import {updateEvaluationCriteria, updateEvaluationCriteriaScale} from "../../store/slices/rubricSlice.js";
import EditEventScale from "./edit_event_scale.jsx";


const EditEventRubric = ({rubric}) => {

    const dispatch = useDispatch()

    // use state for storing the evaluation criteria object. incl. the scales
    const [criteriaForm, setCriteriaForm] = useState({
        uuid: '',
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
    const [scaleForm, setScaleForm] = useState([{
        uuid: '',
        value: '',
        description: '',
    }])

    const [addedScaleForm, setAddedScaleForm] = useState({
        uuid: uuidv4(),
        value: '',
        description: '',
    })

    const clearScales = () => {
        setCriteriaForm(prevForm => ({
            ...prevForm,
            scales: [] // Sets scales to an empty array
        }));
    };

    const setNewScales = (newScales) => {
        setCriteriaForm(prevForm => ({
            ...prevForm,
            scales: newScales
        }));
    };

    useEffect(() => {

        setCriteriaForm(rubric)
        if (rubric.scales) {
            setScaleForm(rubric.scales)
        }
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
        // dispatch(updateEventEvaluationCriteriaScales(scaleForm))
        setScaleForm({
            uuid: uuidv4(),
            value: '',
            description: '',
        })
    }

    const handleRemoveScale = (uuid) => {
        setScaleForm(prevScales =>
            prevScales.filter(scale => scale.uuid !== uuid));
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

                {rubric && rubric.scales.length && rubric.scales.map((scale) => (
                    <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3" key={scale.uuid}>
                        <EditEventScale obj={scale}/>
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
                            // onChange={handleScaleChange}
                        />
                        <textarea
                            className="input input-bordered shadow flex w-full min-w-0 m-3"
                            placeholder="Description"
                            value={addedScaleForm.description}
                            name="description"
                            // onChange={handleScaleChange}
                        />
                    </div>
                    <button className="btn btn-ghost btn-circle" onClick={handleAddScale}>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="green" className="w-6 h-6">
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
