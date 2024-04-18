import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import EvaluationCriteriaCard from "./evaluation_criteria_card";
import { useDispatch, useSelector } from 'react-redux';
import EvaluationCriteriaScale from "./evaluation_criteria_scale";
import { clearEventEvaluationCriteriaScales, updateEventEvaluationCriteria, updateEventEvaluationCriteriaScales } from "../../store/slices/newEventSlice";



const EventRubric = () => {
  const evaluationCriteria = useSelector(state => state.event.eventEvaluationCriteria)
  const evaluationCriteriaScales = useSelector(state => state.event.eventEvaluationCriteriaScales)
  const dispatch = useDispatch()

  // use state for storing the evaluation criteria object. incl. the scales
  const [formData, setFormData] = useState({
    uuid: uuidv4(),
    name: '',
    description: '',
    scales: []
  })

  // useState for storing the form input of a ev. criteria scale
  const [scaleData, setScaleData] = useState({
    uuid: uuidv4(),
    value: '',
    description: '',
  })

  // handling form values of the evaluation criteria scales in a usestate
  const handleScaleInput = (e) => {
    const { name, value } = e.target;
    setScaleData({
      ...scaleData,
      [name]: value
    });

  }
  // handling form values of the main fields of the evaluation criteria
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlAddCriteria = (e) => {
    // checking if main fields were filled
    if (!formData) {
      console.error('Please input Evaluation Criteria information')
    } else {
      // storing the scales from redux in the evaluation criteria obj
      setFormData({
        ...formData,
        scales: evaluationCriteriaScales
      })
      // storing the whole evaluation criteria obj in redux
      dispatch(updateEventEvaluationCriteria(formData))
      // clearing the redux state for the evaluation criteria scales
      dispatch(clearEventEvaluationCriteriaScales())
      // clearing the evaluation criteria form
      setFormData({
        uuid: uuidv4(),
        name: '',
        description: '',
        scales: []
      })
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
    <div className="flex flex-col">
      <p>Defining Evaluation Criteria</p>
      <p>Define here the criterias your jury shoudld use to evaluate all contestants.</p>
      <input
      className="input input-bordered" 
      type="text" 
      placeholder="Name"
      value={formData.name}
      name="name"
      onChange={handleInputChange}
      ></input>
      <textarea
      className="input input-bordered" 
      type="text" 
      placeholder="Description"
      value={formData.description}
      name="description"
      onChange={handleInputChange}
      ></textarea>
      <p>Scale</p>
      <input
      className="input input-bordered" 
      type="number" 
      placeholder="Value"
      value={scaleData.value}
      name="value"
      onChange={handleScaleInput}
      ></input>
      <textarea
      className="input input-bordered" 
      type="text" 
      placeholder="Description"
      value={scaleData.description}
      name="description"
      onChange={handleScaleInput}
      ></textarea>
      <button className="btn" onClick={handleAddScale}>Add scale</button>
      {evaluationCriteriaScales.map(obj => {
        return <EvaluationCriteriaScale obj={obj} key={obj.uuid} />
      })}
      <button className="btn" onClick={handlAddCriteria}>Add Criteria</button>
      {evaluationCriteria.map(obj => {
        return <EvaluationCriteriaCard obj={obj} key={obj.uuid} />
      })}
    
    </div>
  )

}

export default EventRubric