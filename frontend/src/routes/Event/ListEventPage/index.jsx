import { Link } from 'react-router-dom'
import EventCard from '../../../components/EventCard'

const events = [
  {
    id: 1,
    title: 'Event 1',
    description:
      'This is the description of the Event 1. Event 1 is something special. Blablablablabla',
    logoUrl: '',
  },
  {
    id: 2,
    title: 'Event 2',
    description:
      'This is the description of the Event 1. Event 1 is something special',
    logoUrl: '',
  },
]

const ListEventPage = () => {
  return (
    <div className="flex justify-center items-center h-[92vh] overflow-hidden">
      <div className="w-full max-w-15xl p-4 flex flex-col items-center gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            logoUrl={event.logoUrl}
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
