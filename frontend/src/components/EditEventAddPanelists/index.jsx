import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setJudges,
    removeJudge,
    addJudge,
} from '../../store/slices/judgesSlice'
import JudgeAxios from "../../axios/JudgeAxios"
import ErrorMessage from "../Alerts/ErrorMessage.jsx";


const EditEventAddPanelists = ({ eventInformation }) => {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('')

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
    })

    //updates form usestate when editing form
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleAddJudge = () => {
        dispatch(addJudge(formData))
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            username: '',
        })
    }

    const getPanelistInfo = async () => {
            console.log(eventInformation)
            try {
                const response = await JudgeAxios.get(`events/${eventInformation.id}/`)
                dispatch(setJudges(response.data.judges))
            } catch (err) {
                setErrorMessage('Failed loading Events panelist data, ' + err.message)
                console.error('Failed loading Events panelist data', err)
            }
    }


    useEffect(() => {
        if (eventInformation.id) {
            getPanelistInfo()
        }
    }, [eventInformation])

    const panelists = useSelector(state => state.judges.judges)

    //function to remove a judge
    const handleRemoveJudge = (judge) => {
        dispatch(removeJudge(judge.email))
    }


    return (
        <div className="card shadow-lg p-5">
            <div className="flex flex-col items-center text-center mb-5">
                <h2>Edit Panelists</h2>
                <p>
                    Edit the panelists of your event. When the event is updated, new panelists will receive an email
                    with their onboarding link.
                </p>
            </div>
            <div className='flex items-center gap-5 justify-evenly'>
                <div className='flex flex-col gap-y-3'>
                    <div className='flex gap-5'>
                        <input
                            className="input shadow input-bordered"
                            type="text"
                            placeholder="First name"
                            value={formData.first_name}
                            name="first_name"
                            onChange={handleInputChange}
                        />
                        <input
                            className="input shadow input-bordered"
                            type="text"
                            placeholder="Last name"
                            value={formData.last_name}
                            name="last_name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex gap-5'>
                        <input
                            className="input shadow input-bordered"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            name="username"
                            onChange={handleInputChange}
                        />
                        <input
                            className="input shadow input-bordered"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <button
                        className="btn bg-primary hover:bg-gray-300 hover:border-gray-300 shadow-xl"
                        onClick={handleAddJudge}
                    >
                        Add panelist
                    </button>
                </div>
            </div>
            {panelists && (
                <>
                    {panelists.map(panelist => {
                        return (
                            <>
                                <div className='card shadow-lg p-3 flex flex-row justify-between items-center m-4'>
                                    <div className='flex flex-col'>
                                        <div className='flex gap-5'>
                                            <p><strong>First name:</strong> {panelist.first_name}</p>
                                            <p><strong>Last name:</strong> {panelist.last_name}</p>
                                        </div>
                                        <div className='flex gap-5'>
                                            <p><strong>Username:</strong> {panelist.username}</p>
                                            <p><strong>Email:</strong>: {panelist.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-ghost btn-circle"
                                            onClick={() => handleRemoveJudge(panelist)}>
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </>
            )}
            {errorMessage && (
                <div>
                    <ErrorMessage message={errorMessage} />
                </div>
            )}
        </div>
    )
}

export default EditEventAddPanelists