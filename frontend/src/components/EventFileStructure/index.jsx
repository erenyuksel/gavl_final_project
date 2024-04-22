import { useEffect, useState } from "react"
import JudgeAxios from "../../axios/JudgeAxios"
import EventFileStructureCard from "../EventFileStructureCard"



const EventFileStructure = ({ event }) => {
  
  const [eventData, setEventData] = useState()

  useEffect(() => {
    if (event.id) {
      const getEventFileStructure = async () => {
        try {
          const response = await JudgeAxios.get(`events/${event.id}`)
          setEventData(JSON.parse(response.data.project_file_structure))
        } catch (error) {
          console.error(error)
        } 
    }
    getEventFileStructure()
    }
    
  }, [event])
 
  

  return (
    <>
      <h1>Event File Structure</h1>
      {eventData && (
        <>
        <div className="flex flex-col">
          {eventData.map(file => {
            return <EventFileStructureCard file={file} key={file.uuid}/>
          })}
        </div>
        </>
      )}

    </>
  )

}

export default EventFileStructure