import {useEffect, useState} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ImportCSV from '../../../components/ImportCsv'
import AddEventInformation from "../../../components/AddEventInformation/index.jsx";
import {updateEventInformationField} from "../../../store/slices/newEventSlice.js";
import {useDispatch, useSelector} from 'react-redux'


const EditEvent = () => {
    const [eventData, setEventData] = useState({})
    const eventInfo = useSelector((state) => state.event.eventInformation)
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
            const getEventData = async () => {
                try {
                    const response = await JudgeAxios.get(`events/${id}/`)
                    setEventData(response.data)
                    console.log(response.data);

                    Object.entries(eventData).forEach(([key, value]) =>  {
                        console.log(key, value);
                        if (key === 'name')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'start_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'end_date')
                            dispatch(updateEventInformationField({field: key, value: value}));

                        if (key === 'description')
                            dispatch(updateEventInformationField({field: key, value: value}));
                    })

                    console.log("eventInfo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", eventInfo)
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
            Navigate('/events')
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdate = async () => {
        try {
            await JudgeAxios.patch(`events/${id}/`)
            Navigate('/events')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-full p-4 flex flex-col items-center gap-6">
                    <div className="card flex bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2">
                        <div className="text-center">
                            <h1>Edit {eventData.name}</h1>
                        </div>
                        <AddEventInformation/>
                        {/*</div>*/}
                        {/*<div className="text-center">*/}
                        <ImportCSV event_id={id}/>
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

        </>
    )
}

export default EditEvent
