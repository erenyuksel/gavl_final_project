import EventProjectCard from "../EventProjectCard"

const EventProjectView = ( {event}) => {

  const sortedProjects = event.projects ? event.projects.slice().sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0;
  }) : []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 m-5">
    {(event.projects && sortedProjects) && (
      <>
      {sortedProjects.map(project => {
        return <EventProjectCard project={project} key={project.id}/>
      })}
      </>
    )}
    </div>
  )
}

export default EventProjectView