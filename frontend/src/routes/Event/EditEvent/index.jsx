import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import EventInformationSection from '../../../components/EventInformation'
import EventFileStructure from '../../../components/EventFileStructure'

const EditEvent = () => {
  const [eventData, setEventData] = useState({})
  const { id } = useParams()

  const handleUpdate = async () => {
    try {
      await JudgeAxios.patch(`events/${id}/`, eventData)
      // Handle successful update, e.g., show a success message
    } catch (error) {
      console.error(error)
      // Handle error, e.g., show an error message
    }
  }

  // If we choose to add DeleteEvent we can add it here

  const handleDelete = async () => {
    try {
      await JudgeAxios.delete(`events/${id}/`, eventData)
      Navigate('/events')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <EventInformationSection event={eventData}  />
        <EventFileStructure event={eventData} />
        <button className="btn w-60 mt-12" onClick={handleUpdate}>
          Update Event
        </button>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
    </>
  )
}

export default EditEvent
