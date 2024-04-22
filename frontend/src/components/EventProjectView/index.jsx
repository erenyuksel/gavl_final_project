import EventProjectCard from "../EventProjectCard"

const EventProjectView = ( {event}) => {

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