import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
    <div className="w-100 flex flex-col items-center">
      <div className="w-3/4">
        <div className="card bg-base-100 shadow-xl p-7">
          <EventInformationSection event={eventData}/>
        </div>
        <div>
          <EventProjectView event={eventData} />
        </div>
      </div>
    </div>
  )

    
}

export default ViewEvent
