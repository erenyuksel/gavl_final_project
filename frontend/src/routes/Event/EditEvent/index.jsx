import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import EventInformationSection from '../../../components/EventInformation'
import EventFileStructure from '../../../components/EventFileStructure'
import ImportCSV from '../../../components/ImportCsv'

const EditEvent = () => {
  const [eventData, setEventData] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await JudgeAxios.get(`/events/${id}`)
        setEventData(response.data)
      } catch (error) {
        console.error('To fetch the events was not possible', error)
      }
    }

    fetchEvents()
  }, [])

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
        <EventInformationSection event={eventData} />
        <EventFileStructure event={eventData} />
        <ImportCSV event_id={id} />
        <button className="btn w-60 mt-12" onClick={handleUpdate}>
          Update Event
        </button>

        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  )
}

export default EditEvent
