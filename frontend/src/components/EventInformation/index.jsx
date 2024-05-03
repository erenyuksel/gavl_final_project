import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const EventInformationSection = ({ event }) => {
  const userProfile = useSelector(state => state.user.user)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  // set admin priviliges to view edit event and statistics page
  useEffect(() => {
    if (userProfile) {
      if (userProfile.role === 'Organisation Admin' || userProfile.role === 'Admin') {
        setIsAdmin(true)
      }
    }
  }, [userProfile])



  // handler to navigate user to the Edit Event page
  const handleEditEventNav = () => {
    navigate(`/event/edit/${event.id}`)
  }

  // handler to navigate user to the event statistics page
  const handleEventStatsNav = () => {
    navigate(`/event/statistics/${event.id}`)
  }

  // checks the event start and end dates and provides event status
  const getStatus = (startDateString, endDateString) => {
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)
    console.log("🚀 ~ getStatus ~ endDate:", endDate)
    console.log("🚀 ~ getStatus ~ startDate:", startDate)
    const currentDate = new Date();
    console.log("🚀 ~ getStatus ~ currentDate:", currentDate)
    
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
        {userProfile && (
        <div className='m-5 rounded-full w-16 h-16'>
          <img src={userProfile.organisation.logo ? userProfile.organisation.logo : 'https://www.climb-it.fr/wp-content/uploads/2020/03/logo-placeholder-png-2.png'} 
          alt='Organisation logo'
          className='rounded-full' />
        </div>
        )}
        <h1>{event.name}</h1>
        <div>
          <h2>{event.description}</h2>
        </div>
        <div className="flex flex-row align-middle">
          <h4>Event status:</h4>
          {getStatus(event.start_date, event.end_date)}
        </div>
        {isAdmin && (
          <div className='flex flex-row gap-3 m-4'>
            <button className='btn btn-primary' onClick={handleEditEventNav}>Edit Event</button>
            <button className='btn btn-primary' onClick={handleEventStatsNav}>Event Statistics</button>
          </div>
        )}
      </div>
    </>
  )
}

export default EventInformationSection
