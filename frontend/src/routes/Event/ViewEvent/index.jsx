import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import JudgeAxios from "../../../axios/JudgeAxios"
import EventInformationSection from "../../../components/EventInformation"
import EventProjectView from "../../../components/EventProjectView"

const ViewEvent = () => {
  const [eventData, setEventData] = useState({})
  const { id } = useParams()
  
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await JudgeAxios.get(`events/${id}/`)
        setEventData(response.data)
      } catch (error) {
        console.error(error)
      }
    } 
    getEventData()
  }, [])

  return (
    <>
      <EventInformationSection event={eventData} />
      <EventProjectView event={eventData} />
      <Link to="/event/edit/:id/" className="btn">
        Edit Event
      </Link>
    </>
  )

    
}

export default ViewEvent
