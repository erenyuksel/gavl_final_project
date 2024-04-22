import { Link } from 'react-router-dom'
//import to find in ListEventPage
const EventCard = ({ title, description, event_id, p_id}) => (
  <div className="card flex flex-row bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2">
    <div className="card-body w-3/4">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <Link to={`/event/${event_id}`} className="btn btn-primary">
          View Event
        </Link>
        <Link to={`/project/list`} className='btn btn-secondary'>
          View Participants
        </Link>
      </div>
    </div>
  </div>
)

export default EventCard
