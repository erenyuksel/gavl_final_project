import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import JudgeAxios from "../../../axios/JudgeAxios"
import EventInformationSection from "../../../components/EventInformation"
import EventProjectView from "../../../components/EventProjectView"

const ViewEvent = () => {
    const [eventData, setEventData] = useState({})
    const {id} = useParams()

    useEffect(() => {
        const getEventData = async () => {
            try {
                const response = await JudgeAxios.get(`events/${id}/`)
                setEventData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getEventData()
    }, [])

    return (

        <div className="w-100 flex flex-col items-center">
            <div className="w-full max-w-16xl p-4 flex flex-col items-center gap-6 bg-gold">
                <div className="card bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2 p-5">
                    <EventInformationSection event={eventData}/>
                </div>
                <div>
                    <EventProjectView event={eventData}/>
                </div>
            </div>
        </div>
    )


}

export default ViewEvent
