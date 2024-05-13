import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addJudge,
  removeJudge,
} from '../../store/slices/judgesSlice'
import { v4 as uuidv4 } from 'uuid'

const AddInviteJudges = () => {
  const judges = useSelector((state) => state.judges.judges) //store in redux store judgeSlice
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    uuid: uuidv4(),
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  })

  //acts Changes when creating a judge
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }



  //adds the panelist information stored in the useState to redux and clears the form again
  const handleAddJudge = () => {
    dispatch(addJudge(formData))
    setFormData({
      uuid: uuidv4(),
      first_name: '',
      last_name: '',
      email: '',
      username: '',
    })
  }

  //function to remove a judge
  const handleRemoveJudge = (judge) => {
    dispatch(removeJudge(judge.email))
  }

  return (
    <div className='card shadow-lg p-5'>
      <div>
        <div className="flex flex-col mb-5 items-center text-center">
          <h2>Panelists</h2>
          <p>
            Add the panelists for your event here. When the event is created every panelist will receive an email with their onboarding link.
          </p>
        </div>
        <div className='flex items-center gap-5'>
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
        <div>
          {judges.map(judge => {
            return (
              <>
                <div className='card shadow-lg p-3 flex flex-row justify-between items-center m-4'>
                  <div className='flex flex-col'>
                    <div className='flex gap-5'>
                      <p><strong>First name:</strong> {judge.first_name}</p>
                      <p><strong>Last name:</strong> {judge.last_name}</p>
                    </div>
                    <div className='flex gap-5'>
                      <p><strong>Username:</strong> {judge.username}</p>
                      <p><strong>Email:</strong>: {judge.email}</p>
                    </div>
                  </div>
                  <div>
                  <button className="btn btn-ghost btn-circle" onClick={() => handleRemoveJudge(judge)}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </div>
                        </button>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AddInviteJudges
