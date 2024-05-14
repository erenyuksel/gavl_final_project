import {useEffect, useState} from 'react'
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
import {
    removeEvaluationCriteria,
    updateEvaluationCriteria,
    updateEvaluationCriteriaScale
} from "../../../store/slices/rubricSlice.js";
import EditEventAddPanelists from '../../../components/EditEventAddPanelists/index.jsx';
import {setJudges} from '../../../store/slices/judgesSlice.js';
import {v4 as uuidv4} from "uuid";


const EditEvent = () => {
    const [eventData, setEventData] = useState({})
    const eventInfo = useSelector((state) => state.event.eventInformation)
    const eventEvaluationCriteria = useSelector((state) => state.rubric.evaluationCriteria)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [rubrics, setRubrics] = useState([])
    const location = useLocation();
    const updatedPanelists = useSelector(state => state.judges.judges)

    const [rubricPropsInformation] = useState({
        uuid: uuidv4(),
        name: '',
        description: '',
        scales: []
    });

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

                    setRubrics(JSON.parse(response2.data.criteria_json));

                    rubrics.map((rubric) => {
                        try { // storing the evaluation criteria obj in redux, the evaluation criteria scales are added in the reducer function
                            dispatch(updateEvaluationCriteria(rubric))

                            if (rubric && rubric.scales.length) {
                                rubric.scales.map((scale) => {
                                    dispatch(updateEvaluationCriteriaScale(scale))
                                })
                            }
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
        try {

            // updating the rubrics obj which is stored on the event
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

            // check if panelist information is stored in redux, if so
            if (updatedPanelists) {
                // store the userIDs of the already existing users in an array
                const panelistIDs = []
                const toCreatePanelists = []
                for (let panelist of updatedPanelists) {
                    if (panelist.id) {
                        panelistIDs.push(panelist.id)
                    } else {
                        toCreatePanelists.push(panelist)
                    }
                }

                // get the objects for the newly added panelists and create the user
                await Promise.all(
                    toCreatePanelists.map(async (panelist) => {
                        //create panelists and trigger email sending 
                        const response = await JudgeAxios.post(
                            `/users/?event_name=${eventData.name}`,
                            {
                                first_name: panelist.first_name,
                                last_name: panelist.last_name,
                                email: panelist.email,
                                username: panelist.username,
                                role: 'Judge',
                            },
                        )
                        // add the ids from the reponse to the already existing ids
                        panelistIDs.push(response.data.id)
                        // 
                    }))

                const patchResponse = await JudgeAxios.patch(
                    `/events/${id}/`,
                    {
                        judges: panelistIDs,
                    },
                )

                dispatch(setJudges([]))
            }
        } catch (error) {
            console.error(error)
        }
        navigate(`/event/${id}`)
    }

    const handleRemoveRubric = (uuid) => {
        // console.log("h----------handleRemoveRubric -----aa", uuid, rubrics)

        if (uuid !== '' || typeof uuid !== 'undefined' || uuid.length > 0) {
            setRubrics(prevRubrics =>
                prevRubrics.filter(rubric => rubric.uuid !== uuid));

            dispatch(removeEvaluationCriteria(uuid));
        }

        // console.log("h----------handleRemoveRubric -----after", uuid, rubrics)
    }

    const handleAddRubric = () => {
        setRubrics(eventEvaluationCriteria);
       // console.log("~~~~~~~ added criteria form RUBRICS ", rubrics)
    }

    return (
        <div className="w-100 flex flex-col items-center">
            <div className="w-full max-w-16xl p-4 flex flex-col items-center gap-6 bg-gold">
                <div className="flex flex-col gap-5 w-full lg:w-2/3 xl:w-1/2 p-5">

                    <div className="text-center">
                        <h1>Edit {eventData.name}</h1>
                    </div>
                    <AddEventInformation eventInformation={eventData}/>
                    <EditEventAddPanelists eventInformation={eventData}/>


                    {rubrics && <div className='flex flex-col items-center'>
                        <h2>Update Evaluation Criterias</h2>
                        <p>
                            Update the evaluation criterias of your event.
                        </p>
                    </div>}

                    {rubrics && rubrics.map((obj) =>
                        <div key={obj.uuid} className="flex flex-col">
                            <EditEventRubric rubric={obj} removeRubric={() => handleRemoveRubric(obj.uuid)} className = ".bg-gray-200"/>
                        </div>
                    )}

                    <EditEventRubric rubric={rubricPropsInformation} addRubric={handleAddRubric}/>

                    <ImportCSV event_id={id}/>
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
