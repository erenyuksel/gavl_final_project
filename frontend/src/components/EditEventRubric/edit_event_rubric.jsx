import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import {updateEvaluationCriteria} from "../../store/slices/rubricSlice.js";


const EditEventRubric = ({obj}) => {

    const criteriaSlice = useSelector((state) => state.rubric.evaluationCriteria.find(crit => crit.uuid === obj))
    // const scaleSlice = criteriaSlice.scales
    //useSelector((state) => state.rubric.eventEvaluationCriteriaScales)
    const dispatch = useDispatch()

    // use state for storing the evaluation criteria object. incl. the scales
    const [criteriaForm, setCriteriaForm] = useState({
        uuid:'',
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
        if (criteriaSlice && criteriaForm.uuid === '') {
            // if (criteriaSlice && criteriaSlice.scales && criteriaForm.uuid === '' && scaleForm.uuid === '') {
            // if (criteriaSlice && criteriaSlice.scales) {
            setCriteriaForm(criteriaSlice)
            // criteriaSlice.scales.map((scale) => {
            //     console.log("map useEffect", scale)
            //     setScaleForm(scale)
            // })

            if (criteriaSlice.scales) {
                setScaleForm(criteriaSlice.scales.map(scale => ({
                    ...scale,
                    uuid: scale.uuid || uuidv4(),  // Ensure each scale has a UUID
                })));
            }
            console.log("INSIDE $$$$$$$$$$$$$$EditEventRubric$$$$$$$$$$$$$$$$$44   useEffect", criteriaForm)
        }
        console.log("OUTSIDE $$$$$$$$$$$$$$EditEventRubric$$$$$$$$$$$$$$$$$44   useEffect", criteriaForm)
    }, [criteriaSlice])

    // useEffect(() => {
    //
    //     clearScales()
    //     setNewScales(scaleForm)
    //
    //     console.log("UUUUUUUUUUUd^^^^CRIT====useEffect=====ERIA^^^^^^^UEUUUUUUUUUUUUUUUUUUU", criteriaForm)
    //
    //     dispatch(updateEvaluationCriteria(criteriaForm))
    //
    // }, [scaleForm]);

    function handleScaleChange(e, uuid) {

        // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", e)
        console.log("UUUUUUUUUUUva UUID  UUUUUUUUUUUUUUUUUUU", uuid)


        const {name, value} = e.target
        console.log("UUUUUUUUUUUdNAMEionUUUUUUUUUUUUUUUUUUU", name)
        console.log("UUUUUUUUUUUdesVALUEUUUUUUUUUUUUUUUUUUU", value)


        setScaleForm(prevScales =>
            prevScales.map(scale =>
                scale.uuid === uuid ? {...scale, [name]: value} : scale
            ))


        // setCriteriaForm(prevForm => ({
        //     ...prevForm,
        //     scales: prevForm.scales.map(scale =>
        //         scale.uuid === uuid ? {...scale, [name]: value} : scale
        //     )
        // }));
        //
        // console.log("UUUUUUUUUUUd^^^^CRITERIA^^^^^^^UEUUUUUUUUUUUUUUUUUUU", criteriaForm)
        //
        //

        console.log("___before_________________", criteriaForm)
        console.log("___before scale_________________", scaleForm)
        clearScales()
        setNewScales(scaleForm)
        console.log("___after_________________", criteriaForm)
        // dispatch(updateEvaluationCriteria(criteriaForm))

    }


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
                                onChange={(e) => handleScaleChange(e, scale.uuid)}
                            />
                            <input
                                className="input input-bordered shadow flex w-full min-w-0 m-3"
                                type="text"
                                placeholder="Description"
                                value={scale.description}
                                name="description"
                                onChange={(e) => handleScaleChange(e, scale.uuid)}
                            />
                        </div>

                        <button className="btn btn-ghost btn-circle" onClick={handleRemoveScale}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </div>
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
                            onChange={handleScaleChange}
                        />
                        <textarea
                            className="input input-bordered shadow flex w-full min-w-0 m-3"
                            placeholder="Description"
                            value={addedScaleForm.description}
                            name="description"
                            onChange={handleScaleChange}
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
    obj: PropTypes.string // Add additional fields as necessary
};

export default EditEventRubric
