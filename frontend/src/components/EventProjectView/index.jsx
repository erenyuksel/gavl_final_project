import { useEffect } from "react"
import EventProjectCard from "../EventProjectCard"

const EventProjectView = ( {event}) => {

  useEffect(() => {
    console.log('eventdata in eventprojectview', event)
  }, [event])


  return (
    <>
    {event.projects && (
      <>
      {event.projects.map(project => {
        return <EventProjectCard project={project} key={project.id}/>
      })}
      </>
    )}
    </>
  )
}

export default EventProjectView