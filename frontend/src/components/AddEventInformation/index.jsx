import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventInformation } from '../../store/slices/newEventSlice'

const AddEventInformation = () => {
  const dispatch = useDispatch()
  const eventInformation = useSelector((state) => state.event.eventInformation)

  //sets inital value of the event und refers to the Redux store
  const [formData, setFormData] = useState({
    eventName: eventInformation.eventName || '',
    start_date: eventInformation.start_date || '',
    end_date: eventInformation.end_date || '',
    description: eventInformation.description || '',
  })
  //if user changes something on the form it will store it in the redux
  useEffect(() => {
    /* console.log('Form data updated:', formData)
    console.log('Redux data updated:', eventInformation) */
    dispatch(setEventInformation(formData))
  }, [formData])

  //actualises the state of the form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Text input for Event Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Event Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter event name"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>
      {/* Date input for Start & End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.start_date}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>
      {/* Text Input for descritption  */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Describe the event"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
        ></textarea>
      </div>
    </div>
  )
}
export default AddEventInformation
