import {Link} from 'react-router-dom'
import JudgeAxios from "../../axios/JudgeAxios.jsx";
import {useState} from "react";
import ErrorMessage from "../Alerts/ErrorMessage.jsx";
import SuccessMessage from "../Alerts/SuccessMessage.jsx";
import PropTypes from "prop-types";
//import to find in ListEventPage
const EventCard = ({title, description, event_id, refreshEventList}) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const duplicateEvent = async (id) => {
        let csrftoken = getCookie('csrftoken');

        try {
            const response = await JudgeAxios.post(`events/duplicate/${id}/`, {},
                {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                }
            )
            refreshEventList()
            setSuccessMessage('Event was duplicated successfully')

            setTimeout(() => {
                setSuccessMessage('')
            }, 2000)
            console.log(response.data)

        } catch
            (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="card flex flex-row bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2">
            <div className="card-body w-3/4">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/event/${event_id}`} className="btn btn-primary">
                        View Event
                    </Link>
                    <button className="btn btn-primary" onClick={() => duplicateEvent(event_id)}>
                        Duplicate Event
                    </button>
                </div>
            </div>
            {errorMessage && (
                <div>
                    <ErrorMessage message={errorMessage}/>
                </div>
            )}

            {successMessage && (
                <div>
                    <SuccessMessage message={successMessage}/>
                </div>
            )}
        </div>
    )
}

EventCard.propTypes = {
  title: PropTypes.string.isRequired, // Define rubric prop as an object and mark it as required
  refreshEventList: PropTypes.func, // Define removeRubric prop as a function and mark it as required
  event_id: PropTypes.number.isRequired, // Define addRubric prop as a function and mark it as required
  description: PropTypes.string.isRequired // Define isDisabled prop as a boolean (optional)
};

export default EventCard
