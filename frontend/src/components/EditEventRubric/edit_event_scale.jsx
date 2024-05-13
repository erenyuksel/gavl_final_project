import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import {updateEvaluationCriteriaScale} from "../../store/slices/rubricSlice.js";


const EditEventScale = ({obj}) => {

    console.log("----------------------------   obj", obj)

    //const scaleSlice = useSelector((state) => state.rubric.evaluationCriteriaScale.find(crit => crit.uuid === obj))
    const dispatch = useDispatch()

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

    useEffect(() => {
        setScaleForm(obj)
        console.log("INSIDE ----EditEventScale---------------useEffect-------------   useEffect", scaleForm)
    }, [])

    useEffect(() => {
        console.log("          ^^^^scaleForm====useEffect=====^^^^^^^      ", scaleForm)
        dispatch(updateEvaluationCriteriaScale(scaleForm))
    }, [scaleForm]);

    const handleScaleChange = (e) => {
        const {name, value} = e.target
        setScaleForm({
            ...scaleForm,
            [name]: value,
        })
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
            {/*<div className="flex shadow w-full flex-col items-center m-14   pt-5">*/}

            {scaleForm && (typeof scaleForm.value !== 'undefined' && typeof scaleForm.description !== 'undefined') && (
                <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3">
                    <div className="flex w-1/2 flex-grow items-center">
                        <input
                            className="input shadow input-bordered"
                            type="number"
                            placeholder="Value"
                            value={scaleForm.value}
                            name="value"
                            onChange={handleScaleChange}
                        />
                        <input
                            className="input input-bordered shadow flex w-full min-w-0 m-3"
                            type="text"
                            placeholder="Description"
                            value={scaleForm.description}
                            name="description"
                            onChange={handleScaleChange}
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
            )}
            {/*</div>*/}
            {/*</div>*/}
        </>
    )
}

EditEventScale.propTypes = {
    obj: PropTypes.object // Add additional fields as necessary
};

export default EditEventScale
