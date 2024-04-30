import AddProjectContent from '../../../components/AddProjectContent/add_project_content'
import AddEventInformation from '../../../components/AddEventInformation'
import EventRubric from '../../../components/AddEventRubric/event_rubric'
import { useDispatch, useSelector } from 'react-redux'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useNavigate } from 'react-router-dom'
import {
  clearEventEvaluationCriteria,
  clearEventProjectStructure,
  setEventInformation,
} from '../../../store/slices/newEventSlice'
import AddInviteJudges from '../../../components/AddInviteJudges'

const AddNewEvent = () => {
  const eventInfo = useSelector((state) => state.event.eventInformation)
  const eventProjectStructure = useSelector(
    (state) => state.event.eventProjectStructure,
  )
  const eventEvaluationCriteria = useSelector(
    (state) => state.event.eventEvaluationCriteria,
  )
  const judges = useSelector((state) => state.judges.judges)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // creating a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault()
    // checking if event form was filled out and there is at least the basic info, a contestant field and an evaluation criteria set
    if (
      eventInfo &&
      eventProjectStructure.length > 0 &&
      eventEvaluationCriteria.length > 0
    ) {
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
          //send judges data to the endpoint to send emails to judges
          judges.forEach(async (judge) => {
            await JudgeAxios.post(`/users/?event_name=${eventInfo.eventName}`, {
              id: judge.id,
              first_name: judge.firstName,
              last_name: judge.lastName,
              email: judge.email,
              username: judge.username,
              role: 'Judge',
            })
          })
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
    <div className="w-full">
      <div className="text-center  mt-10">
        <h1>Create New Event</h1>
      </div>
      <AddEventInformation />
      <div className="text-center p-3">
        <AddProjectContent />
      </div>
      <div className="text-center  flex  flex-col items-center">
        <EventRubric />
      </div>
      {/* Eren will work on styling these components */}
      <div className="text-center  p-3">
        <AddInviteJudges />
      </div>
      <div className="flex justify-center mt-10 mb-5 text-center">
        <button
          className="flex btn  bg-gray-400 rounded   shadow-xl mr-2"
          onClick={handleCreateEvent}
        >
          Create Event
        </button>
      </div>
    </div>
  )
}

export default AddNewEvent
