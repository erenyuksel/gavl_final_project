import AddProjectContent from "../../../components/AddProjectContent/add_project_content"
import AddEventInformation from '../../../components/AddEventInformation'

const AddNewEvent = () => { 
  return (
    <>
      <h1>Create new event</h1>
      <AddEventInformation />
      <AddProjectContent />
    </>
  )
}

export default AddNewEvent
