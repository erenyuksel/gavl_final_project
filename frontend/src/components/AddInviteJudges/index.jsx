import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addJudge,
  removeJudge,
  setJudges,
} from '../../store/slices/judgesSlice'

const AddInviteJudges = () => {
  const [isOpen, setIsOpen] = useState(false)
  const judges = useSelector((state) => state.judges.judges) //store in redux store judgeSlice
  const dispatch = useDispatch()

  //acts Changes when creating a judge
  const handleInputChange = (id, field, value) => {
    const updatedJudges = judges.map((judge) =>
      judge.id === id ? { ...judge, [field]: value } : judge,
    )
    dispatch(setJudges(updatedJudges)) //actualize the state in redux
    /* console.log('Updated Judges after input change:', updatedJudges) */
  }
  //only possible to add a new judge if all fields are filled out
  const allFieldsFilled = (judge) => {
    return judge.firstName && judge.lastName && judge.email && judge.username
  }

  //handles the form to generate a new line of empty fields for a new judge
  const handleAddJudge = () => {
    if (judges.every(allFieldsFilled)) {
      dispatch(
        addJudge({
          id: Date.now(),
          firstName: '',
          lastName: '',
          email: '',
          username: '',
        }),
      )
    } else {
      alert(
        'Please fill out all fields for the existing judge before adding a new one.',
      )
    }
  }
  //function to remove a judge
  const handleRemoveJudge = (id) => {
    dispatch(removeJudge(id))
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Hide Judges' : 'Show Judges'}
        </button>
        {isOpen && (
          <button className="btn btn-success" onClick={handleAddJudge}>
            Add Judge
          </button>
        )}
      </div>
      {isOpen && (
        <div className="p-4 mt-4 border rounded shadow">
          {judges.map((judge) => (
            <div key={judge.id}>
              <div className="flex flex-wrap items-center -mx-3 mb-2">
                {['firstName', 'lastName', 'username', 'email'].map(
                  (field, idx) => (
                    <div key={idx} className={`w-1/4 px-3 mb-6 md:mb-0`}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </span>
                        </label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          name={field}
                          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                          className="input input-bordered"
                          value={judge[field]}
                          onChange={(e) =>
                            handleInputChange(judge.id, field, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <button
                    className="btn btn-error"
                    onClick={() => handleRemoveJudge(judge.id)}
                  >
                    Remove Judge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddInviteJudges
