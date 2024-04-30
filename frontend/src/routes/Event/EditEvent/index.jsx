import {useEffect, useState} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ImportCSV from '../../../components/ImportCsv'
import AddEventInformation from "../../../components/AddEventInformation/index.jsx";
import {setEventInformation, updateEventInformationField} from "../../../store/slices/newEventSlice.js";
import {useDispatch, useSelector} from 'react-redux'
import EventRubric from "../../../components/AddEventRubric/event_rubric.jsx";


const EditEvent = () => {
    const [eventData, setEventData] = useState({})
    const eventInfo = useSelector((state) => state.event.eventInformation)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // useEffect(() => {
    //     dispatch(setEventInformation({}))
    // }, []);

    const location = useLocation();

    useEffect(() => {
        // Function to run on location change
        const handleLocationChange = (currentLocation) => {
            console.log('New location:', currentLocation.pathname);
            // Your logic here, e.g., check if the user really wants to navigate away
        };

        // Call the function with the current location initially
        handleLocationChange(location);

        console.log("ZZZZZZZ33333333ZZZZZZZZZz -- return")

        // Call the function whenever location changes
        return () => {
            dispatch(setEventInformation({}))
            console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZz -- return")
        }; // If needed, perform cleanup
    }, [location]); // Re-run the effect only if location changes

    useEffect(() => {
            const getEventData = async () => {
                try {
                    const response = await JudgeAxios.get(`events/${id}/`)
                    setEventData(response.data)
                    console.log(response.data);

                    Object.entries(response.data).forEach(([key, value]) => {
                        // console.log(key, value);
                        if (key === 'name') {
                            dispatch(updateEventInformationField({field: key, value: value}));
                            // console.log(key, value);
                        }

                        if (key === 'start_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'end_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'description')
                            dispatch(updateEventInformationField({field: key, value: value}));
                    })
                } catch
                    (error) {
                    console.error(error)
                }
            }
            getEventData()
            // console.log("eventInfo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", eventInfo)
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
        try {
            await JudgeAxios.patch(`events/${id}/`, {
                name: eventInfo.name,
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
                    <AddEventInformation/>
                    <ImportCSV event_id={id}/>

                    {/*<div className="text-center  flex  flex-col items-center">*/}
                    {/*    <EventRubric/>*/}
                    {/*</div>*/}

                    <div className="w-full p-4 flex flex-row items-center gap-6">
                        <button className="btn mt-8" onClick={handleUpdate}>
                            Update Event
                        </button>
                        <button className="btn mt-8" onClick={handleDelete}>
                            Delete Event
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditEvent
