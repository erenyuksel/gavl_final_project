import AddProjectContent from "../../../components/AddProjectContent/add_project_content"
import AddEventInformation from '../../../components/AddEventInformation'
import EventRubric from "../../../components/AddEventRubric/event_rubric"
import { useDispatch, useSelector } from "react-redux"
import JudgeAxios from "../../../axios/JudgeAxios"
import { useNavigate } from "react-router-dom"
import { clearEventEvaluationCriteria, clearEventProjectStructure, setEventInformation } from "../../../store/slices/newEventSlice"


const AddNewEvent = () => { 
  const eventInfo = useSelector(state => state.event.eventInformation)
  const eventProjectStructure = useSelector(state => state.event.eventProjectStructure)
  const eventEvaluationCriteria = useSelector(state => state.event.eventEvaluationCriteria)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // creating a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault()
    // checking if event form was filled out and there is at least the basic info, a contestant field and an evaluation criteria set
    if (eventInfo && eventProjectStructure.length > 0 && eventEvaluationCriteria.length > 0) {
      try {
        // creating the rubrics obj which is stored on the event
        const res = await JudgeAxios.post('rubrics/', {
          criteria_json: JSON.stringify(eventEvaluationCriteria),
        })
        // creating the event obj with data from redux states
        const response = await JudgeAxios.post('events/', {
          name: eventInfo.eventName,
          start_date: eventInfo.startDate,
          end_date: eventInfo.endDate,
          description: eventInfo.description,
          rubrics: res.data.id,
          project_file_structure: JSON.stringify(eventProjectStructure),
        })
        if (response) {
          // if successfull we clear the whole redux states so that the new event form is usable again
          dispatch(setEventInformation({}))
          dispatch(clearEventEvaluationCriteria())
          dispatch(clearEventProjectStructure())
          navigate('/')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('Please provide all the necessary information')
    }
  }
  return (
    <>
      <h1>Create new event</h1>
      <AddEventInformation />
      <AddProjectContent />
      <EventRubric />
      <button className="btn" onClick={handleCreateEvent}>Create Event</button>
    </>
  )
}

export default AddNewEvent
