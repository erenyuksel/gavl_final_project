import { Link } from 'react-router-dom'
import EventCard from '../../../components/EventCard'
import { useEffect, useState } from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../store/slices/userSlice.js'

const ListEventPage = () => {
  const [events, setEvents] = useState([])
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const isAdmin =
    (user && user.role === 'Organisation Admin') ||
    (user && user.role === 'Admin')

  const getCurrentUser = async () => {
    try {
      const response = await JudgeAxios.get(`/users/me/`)
      dispatch(setUser(response.data))
    } catch (error) {
      console.error('Error by showing my User Data', error)
    }
  }

  useEffect(() => {
    if (token !== null && user === null) {
      getCurrentUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await JudgeAxios.get(`/events/`)
        setEvents(response.data)
      } catch (error) {
        console.error('To fetch the events was not possible', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-15xl p-4 flex flex-col items-center gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            description={event.description}
            event_id={event.id}
          />
        ))}
        {isAdmin && (
          <Link to={`/new-event`} className="btn btn-primary">
            Create a new Event
          </Link>
        )}
      </div>
    </div>
  )
}

export default ListEventPage
