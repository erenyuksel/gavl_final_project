import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import JudgeAxios from "../../../axios/JudgeAxios"
import EventInformationSection from "../../../components/EventInformation"
import EventFileStructure from "../../../components/EventFileStructure"

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
      <EventFileStructure event={eventData} />
    </>
  )

    
}

export default ViewEvent
