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
    <div className="m-10 ">
      <div className="flex  justify-center mb-5">
        <button
          className="btn btn-primary shadow-xl mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Hide Judges' : 'Show Judges'}
        </button>
        {isOpen && (
          <button
            className="btn btn-success shadow-xl"
            onClick={handleAddJudge}
          >
            Add Judge
          </button>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-wrap p-3 mt-4 justify-center  ">
          {judges
            .map((judge) => (
              <div key={judge.id}>
                <div className="flex flex-grow  justify-center flex-wrap items-center -mx-5 mb-7">
                  {/* Centered row for First Name and Last Name */}
                  <div className="w-3/5 flex justify-center mb-6 md:mb-0">
                    <div className="w-full  px-3">
                      <div className="form-control">
                        <label className="label"></label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          className="input input-bordered shadow"
                          value={judge.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              judge.id,
                              'firstName',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full px-3">
                      <div className="form-control">
                        <label className="label"></label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className="input input-bordered shadow"
                          value={judge.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              judge.id,
                              'lastName',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* Centered row for Email and Username */}
                  <div className="w-3/5 flex justify-center">
                    <div className="w-full px-3 mb-6 md:mb-0 ">
                      <div className="form-control">
                        <label className="label"></label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="input input-bordered shadow"
                          value={judge.email}
                          onChange={(e) =>
                            handleInputChange(judge.id, 'email', e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <div className="form-control">
                        <label className="label"></label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          className="input input-bordered shadow"
                          value={judge.username}
                          onChange={(e) =>
                            handleInputChange(
                              judge.id,
                              'username',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3 ">
                  <div className="w-full px-3 mt-5 mb-6 md:mb-5 ">
                    <button
                      className="btn btn-error shadow-xl"
                      onClick={() => handleRemoveJudge(judge.id)}
                    >
                      Remove Judge
                    </button>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      )}
    </div>
  )
}

export default AddInviteJudges
