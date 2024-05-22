import {Link} from 'react-router-dom'
import EventCard from '../../../components/EventCard'
import {useEffect, useState} from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../../../store/slices/userSlice.js'
import ErrorMessage from "../../../components/Alerts/ErrorMessage.jsx";

const ListEventPage = () => {
    const [events, setEvents] = useState([])
    const token = localStorage.getItem('token')
    const [errorMessage, setErrorMessage] = useState('')
    const [searchMessage, setSearchMessage] = useState('')
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
                setErrorMessage('To fetch the events was not possible, ' + error.message)
                // console.error('To fetch the events was not possible', error)
            }
        }

        fetchEvents()
    }, [])

    const handleSearch = (e) => {
        const {value} = e.target
        setSearchMessage(value);
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-15xl p-4 flex flex-col items-center gap-6">
                <div className="sm:w-2/3 xl:w-1/2">
                        <input
                            className="input shadow input-bordered"
                            placeholder="Search..."
                            value={searchMessage}
                            name="value"
                            onChange={handleSearch}
                        />
                </div>

                {events.filter(obj =>
                    obj.name?.toLowerCase().includes(searchMessage.toLowerCase()) ||
                    obj.description?.toLowerCase().includes(searchMessage.toLowerCase())
                )
                .map((event) => (
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
            {errorMessage && (
                <div>
                    <ErrorMessage message={errorMessage}/>
                </div>
            )}
        </div>
    )
}

export default ListEventPage
