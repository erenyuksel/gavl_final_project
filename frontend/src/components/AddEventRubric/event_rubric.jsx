import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EvaluationCriteriaCard from './evaluation_criteria_card'
import { useDispatch, useSelector } from 'react-redux'
import EvaluationCriteriaScale from './evaluation_criteria_scale'
import {
  clearEventEvaluationCriteriaScales,
  updateEventEvaluationCriteria,
  updateEventEvaluationCriteriaScales,
} from '../../store/slices/newEventSlice'

const EventRubric = () => {
  const evaluationCriteria = useSelector(
    (state) => state.event.eventEvaluationCriteria,
  )
  const evaluationCriteriaScales = useSelector(
    (state) => state.event.eventEvaluationCriteriaScales,
  )
  const dispatch = useDispatch()

  // use state for storing the evaluation criteria object. incl. the scales
  const [formData, setFormData] = useState({
    uuid: uuidv4(),
    name: '',
    description: '',
    scales: [],
  })

  // useState for storing the form input of a ev. criteria scale
  const [scaleData, setScaleData] = useState({
    uuid: uuidv4(),
    value: '',
    description: '',
  })

  // handling form values of the evaluation criteria scales in a usestate
  const handleScaleInput = (e) => {
    const { name, value } = e.target
    setScaleData({
      ...scaleData,
      [name]: value,
    })
  }
  // handling form values of the main fields of the evaluation criteria
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlAddCriteria = (e) => {
    e.preventDefault()
    // checking if main fields were filled
    if (!formData.name || !formData.description) {
      console.error('Please input Evaluation Criteria information')
    } else {
      try {
        // storing the evaluation criteria obj in redux, the evaluation criteria scales are added in the reducer function
        dispatch(updateEventEvaluationCriteria(formData))
      } catch (error) {
        console.error(error)
      } finally {
        // clearing the redux state for the evaluation criteria scales
        dispatch(clearEventEvaluationCriteriaScales())
        // clearing the evaluation criteria form
        setFormData({
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
    dispatch(updateEventEvaluationCriteriaScales(scaleData))
    setScaleData({
      uuid: uuidv4(),
      value: '',
      description: '',
    })
  }

  return (
    <>
      <div className="flex shadow w-full flex-col items-center m-14   pt-5">
        <h2>Defining Evaluation Criteria</h2>
        <p>
          Define the criteria that you will use to evaluate all contestants.
        </p>
        <div className="m-5 mt-10">
          <h3>
            <span className="underline underline-offset-auto font-bold  ">
              Criteria
            </span>
          </h3>
        </div>
        <div className="w-full sm:w-[40rem]">
          <input
            className="input shadow input-bordered"
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="w-full sm:w-[40rem] m-3">
          <textarea
            className="input input-bordered shadow w-full sm:w-[40rem]"
            type="text"
            placeholder="Description"
            value={formData.description}
            name="description"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className=" mt-10">
          <h3>
            <span className="underline underline-offset-auto font-bold">
              Scale
            </span>
          </h3>
          {evaluationCriteriaScales.map((obj) => (
            <EvaluationCriteriaScale obj={obj} key={obj.uuid} />
          ))}
        </div>

        <div className="flex flex-wrap items-center w-full sm:w-[40rem] m-3">
          <div className="flex w-1/2 flex-grow items-center">
            <input
              className="input shadow input-bordered"
              type="number"
              placeholder="Value"
              value={scaleData.value}
              name="value"
              onChange={handleScaleInput}
            />
            <textarea
              className="input input-bordered shadow flex w-full min-w-0 m-3"
              type="text"
              placeholder="Description"
              value={scaleData.description}
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
        <button
          className="btn m-10  bg-gray-400 shadow-xl"
          onClick={handlAddCriteria}
        >
          Add Criteria
        </button>
      </div>

      <div>
        {evaluationCriteria.map((obj) => {
          return <EvaluationCriteriaCard obj={obj} key={obj.uuid} />
        })}
      </div>
    </>
  )
}

export default EventRubric
