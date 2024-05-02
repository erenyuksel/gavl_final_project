import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventInformation } from '../../store/slices/newEventSlice'

const AddEventInformation = () => {
    const dispatch = useDispatch()
    const eventInformation = useSelector((state) => state.event.eventInformation)

    //sets inital value of the event und refers to the Redux store
    const [formData, setFormData] = useState({
        name: eventInformation.name || '',
        start_date: eventInformation.start_date || null,
        end_date: eventInformation.end_date || '',
        description: eventInformation.description || '',
    })


    //if user changes something on the form it will store it in the redux
    useEffect(() => {
        dispatch(setEventInformation(formData))
    }, [formData])


    //updates the useState to store the changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <div className='flex flex-col justify-between card shadow-lg p-5'>
            <div className='flex flex-col items-center mb-5'>
                <h2>Event information</h2>
                <p>
                    Provide general information about your upcoming event
                </p>
            </div>
            <div className="form-control">
                <input
                    type="text"
                    placeholder="Event name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered shadow"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Start date</span>
                    </label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="input input-bordered shadow"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">End date</span>
                    </label>

                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        className="input input-bordered shadow"
                    />
                </div>
            </div>
            <div className="form-control">
                <textarea
                    placeholder="Describe the event"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered shadow h-24"
                ></textarea>
            </div>
        </div>
    )
}

export default AddEventInformation
