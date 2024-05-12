import {useEffect, useRef, useState} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ImportCSV from '../../../components/ImportCsv'
import AddEventInformation from "../../../components/AddEventInformation/index.jsx";
import {
    setEventInformation,
    updateEventInformationField
} from "../../../store/slices/newEventSlice.js";
import {useDispatch, useSelector} from 'react-redux'
import EditEventRubric from "../../../components/EditEventRubric/edit_event_rubric.jsx";
import {updateEvaluationCriteria, updateEvaluationCriteriaScale} from "../../../store/slices/rubricSlice.js";


const EditEvent = () => {
    const [eventData, setEventData] = useState({})
    const eventInfo = useSelector((state) => state.event.eventInformation)
    const eventEvaluationCriteria = useSelector((state) => state.rubric.evaluationCriteria)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rubrics = useRef(null)
    const location = useLocation();

    useEffect(() => {
        // Function to run on location change
        const handleLocationChange = (currentLocation) => {
        };

        // Call the function with the current location initially
        handleLocationChange(location);

        // Call the function whenever location changes
        return () => {
            dispatch(setEventInformation({}))
        }; // If needed, perform cleanup
    }, [location]); // Re-run the effect only if location changes

    useEffect(() => {
            const getEventData = async () => {
                try {
                    const response = await JudgeAxios.get(`events/${id}/`)
                    setEventData(response.data)

                    Object.entries(response.data).forEach(([key, value]) => {
                        if (key === 'name')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'start_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'end_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'description')
                            dispatch(updateEventInformationField({field: key, value: value}));
                    })

                    const response2 = await JudgeAxios.get(`/rubrics/${response.data.rubrics}`)

                    rubrics.current = JSON.parse(response2.data.criteria_json);

                    rubrics.current.map((rubric) => {
                        try {
                            // storing the evaluation criteria obj in redux, the evaluation criteria scales are added in the reducer function
                            dispatch(updateEvaluationCriteria(rubric))
                            // dispatch(updateEvaluationCriteriaScale(rubric.scales[0]))

                            if (rubric && rubric.scales.length) {
                                rubric.scales.map((scale) => {
                                    dispatch(updateEvaluationCriteriaScale(scale))
                                })
                            }
                            // console.log(rubric)

                        } catch (error) {
                            console.error(error)
                        }
                    })
                } catch
                    (error) {
                    console.error(error)
                }
            }
            getEventData()
        }, []
    )

    const handleDelete = async () => {
        try {
            await JudgeAxios.delete(`events/${id}/`)

        } catch (error) {
            console.error(error)
        }
        navigate('/')
    }

    const handleUpdate = async () => {
        // checking if event form was filled out and there is at least the basic info, a contestant field and an evaluation criteria set
        // if (
        //     eventInfo &&
        //     eventEvaluationCriteria.length > 0
        // ) {
        try {

            // creating the rubrics obj which is stored on the event
            const res = await JudgeAxios.patch(`rubrics/${eventData.rubrics}`, {
                criteria_json: JSON.stringify(eventEvaluationCriteria),
            })

            const response = await JudgeAxios.patch(`events/${id}/`, {
                name: eventInfo.name,
                start_date: eventInfo.start_date,
                end_date: eventInfo.end_date,
                description: eventInfo.description,
                rubrics: res.data.id,
            })


        } catch (error) {
            console.error(error)
        }

        navigate(`/event/${id}`)
    }


    return (
        <div className="w-100 flex flex-col items-center">
            <div className="w-full max-w-16xl p-4 flex flex-col items-center gap-6 bg-gold">
                <div className="card bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2 p-5">

                    <div className="text-center">
                        <h1>Edit {eventData.name}</h1>
                    </div>
                    <AddEventInformation eventInformation={eventData}/>
                    <ImportCSV event_id={id}/>

                    {rubrics.current && rubrics.current.map((obj) =>
                        <div key={obj.uuid} className="text-center  flex  flex-col items-center">
                            <EditEventRubric rubric={obj}/>
                        </div>
                    )}
                    <div className="w-full p-4 flex flex-row justify-center gap-6">
                        <button className="btn btn-success mt-8" onClick={handleUpdate}>
                            Update Event
                        </button>
                        <button className="btn btn-error mt-8" onClick={handleDelete}>
                            Delete Event
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditEvent
