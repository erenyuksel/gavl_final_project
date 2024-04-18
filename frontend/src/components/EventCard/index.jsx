import { Link } from 'react-router-dom'

const EventCard = ({ name, description, logoUrl, eventId }) => (
  <div className="card flex flex-row bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2">
    <div className="w-1/4 bg-gray-100 flex items-center justify-center p-4">
      <img src={logoUrl} alt="Event Logo" className="max-h-full max-w-full" />
    </div>
    <div className="card-body w-3/4">
      <h2 className="card-title">{name}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <Link to={`/event/${eventId}`} className="btn btn-primary">
          View Event
        </Link>
      </div>
    </div>
  </div>
)

export default EventCard
