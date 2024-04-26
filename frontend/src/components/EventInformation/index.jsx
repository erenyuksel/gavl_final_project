const EventInformationSection = ({ event }) => {

  const getStatus = (startDate, endDate) => {
    const currentDate = new Date();
  
    if (currentDate < startDate) {
      return <p className="badge badge-lg bg-orange-300">upcoming</p>
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return <p className="badge badge-lg bg-green-400 ml-3">active</p>
    } else {
      return <p className="badge badge-lg bg-red-300 ml-3">expired</p>
    }
  }

  return (
    <>
    <div className="flex flex-col w-100 items-center">
      <h1>{event.name}</h1>
      <div>
        <h2>{event.description}</h2>
      </div>
      <div className="flex flex-row align-middle">
        <h4>Event status:</h4>
        {getStatus(event.start_date, event.end_date)}
      </div>
    </div>
    </>
  )
}

export default EventInformationSection
