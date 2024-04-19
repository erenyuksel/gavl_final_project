import { Link } from 'react-router-dom'
import EventCard from '../../../components/EventCard'
import { useEffect, useState } from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'

const ListEventPage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await JudgeAxios.get(`/events/`)
        /* console.log('Fetched events data:', response.data) */
        setEvents(response.data)
      } catch (error) {
        console.error('To fetch the events was not possible', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="flex justify-center items-center h-[92vh] overflow-hidden">
      <div className="w-full max-w-15xl p-4 flex flex-col items-center gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            description={event.description}
            event_id={event.id}
          />
        ))}
        <Link to={`/new-event`} className="btn w-60 mt-12">
          Create a new Event
        </Link>
      </div>
    </div>
  )
}

export default ListEventPage
