import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from "prop-types";
import {updateEvaluationCriteriaScale} from "../../store/slices/rubricSlice.js";


// eslint-disable-next-line react/prop-types
const EditEventScale = ({obj, deleteScale}) => {

    // console.log("----------------------------   obj", obj)
    const dispatch = useDispatch()

    const [scaleForm, setScaleForm] = useState([{
        uuid: '',
        value: '',
        description: '',
    }])

    useEffect(() => {
        setScaleForm(obj)
        // console.log("INSIDE ----EditEventScale---------------useEffect-------------   useEffect", scaleForm)
    }, [])

    useEffect(() => {
        // console.log("          ^^^^scaleForm====useEffect== edit event scale ===^^^^^^^      ", scaleForm)
        dispatch(updateEvaluationCriteriaScale(scaleForm))
    }, [scaleForm]);

    const handleScaleChange = (e) => {
        const {name, value} = e.target
        setScaleForm({
            ...scaleForm,
            [name]: value,
        })
    }

    const handleRemoveScale = () => {
        deleteScale()
    }

    return (
        <>
            {scaleForm && (typeof scaleForm.value !== 'undefined' && typeof scaleForm.description !== 'undefined') && (
                <div className="flex flex-wrap items-center w-full">
                    <div className="flex flex-grow items-center">
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
                </div>
            )}
        </>
    )
}

EditEventScale.propTypes = {
    obj: PropTypes.object // Add additional fields as necessary
};

export default EditEventScale
