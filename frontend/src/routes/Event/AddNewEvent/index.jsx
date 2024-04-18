import AddProjectContent from "../../../components/AddProjectContent/add_project_content"
import AddEventInformation from '../../../components/AddEventInformation'
import EventRubric from "../../../components/AddEventRubric/event_rubric"

const AddNewEvent = () => { 
  return (
    <>
      <h1>Create new event</h1>
      <AddEventInformation />
      <AddProjectContent />
      <EventRubric />
    </>
  )
}

export default AddNewEvent
