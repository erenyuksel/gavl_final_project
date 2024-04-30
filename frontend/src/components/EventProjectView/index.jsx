import EventProjectCard from "../EventProjectCard"

const EventProjectView = ( {event}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 m-5">
    {event.projects && (
      <>
      {event.projects.map(project => {
        return <EventProjectCard project={project} key={project.id}/>
      })}
      </>
    )}
    </div>
  )
}

export default EventProjectView