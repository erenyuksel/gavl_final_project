/* import { useDispatch, useSelector} from 'react-redux';
import { setEventInformation } from '../../store/slices/newEventSlice'; */

const AddEventInformation = () => {
  /*     const dispatch = useDispatch();
    
    const UseEffect = () => {
        const [formData, setFormData] = useState(AddEventInformation);
    }
    const handleFormData = async (event) => {
        event.preventDefault();
    } */
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
          className="input input-bordered"
        />
      </div>
      {/* Date input for Start & End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input type="date" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input type="date" className="input input-bordered" />
        </div>
      </div>
      {/* Text Input for descritption  */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Describe the event"
          className="textarea textarea-bordered h-24"
        ></textarea>
      </div>
    </div>
  )
}

export default AddEventInformation
