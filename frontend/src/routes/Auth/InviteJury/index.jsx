import { useEffect, useState } from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../../store/slices/userSlice'
import LandingPageLeftSide from '../../../components/LandingPageLeftSide'

const InviteJury = () => {
  //extract token from URL
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Auth the User with the token to get users/me Data
  const [userInviteData, setUserInviteData] = useState({
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
  })

  useEffect(() => {
    if (token) {
      //fetches Data from invitedUser Endpoint
      const getUserInviteData = async () => {
        try {
          const response = await JudgeAxios.get(`users/invite/?token=${token}`)
          if (response) {
            setUserInviteData({
              ...userInviteData,
              email: response.data.email,
              username: response.data.username,
            })
            localStorage.setItem('token', token)
          }
        } catch (error) {
          console.error(error)
        }
      }
      getUserInviteData()
    }
  }, [token])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInviteData((prev) => ({ ...prev, [name]: value }))
  }

  //handle formular, checks password and make a patch request
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (userInviteData.password !== userInviteData.passwordRepeat) {
      alert('Passwords do not match!')
      return
    }
    try {
      const response = await JudgeAxios.patch('auth/registration/password/', {
        email: userInviteData.email,
        password: userInviteData.password,
        password_repeat: userInviteData.passwordRepeat,
      })
      dispatch(setEmail(userInviteData.email))
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex min-h-screen">
        <LandingPageLeftSide />
        {/* Right Side */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="flex min-h-full w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="form-control w-full max-w-md p-4 flex mx-auto"
            >
              {/* For background autofill */}
              <style jsx>{`
                input:-webkit-autofill {
                  -webkit-box-shadow: 0 0 0 30px white inset !important;
                  -webkit-text-fill-color: inherit !important;
                  background-color: transparent !important;
                }
              `}</style>
              <h1 className="text-center">Hello {userInviteData.username}</h1>
              <p className="text-justify w-3/4 mx-auto">
                You have been chosen to act as a panelist to rate various ideas.
                Please complete the registration process.
              </p>
              <br />
              <div className="form-control w-full mx-auto">
                <label className="input-group mb-4">
                  <input
                    type="email"
                    name="email"
                    value={userInviteData.email}
                    onChange={handleInputChange}
                    placeholder="E-Mail address"
                    className="w-4/5 flex mx-auto"
                    required
                  />
                </label>
                <label className="input-group mb-4 w-full">
                  <input
                    type="password"
                    name="password"
                    value={userInviteData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-4/5 flex mx-auto"
                    required
                  />
                </label>
                <label className="input-group mb-4 w-full">
                  <input
                    type="password"
                    name="passwordRepeat"
                    value={userInviteData.passwordRepeat}
                    onChange={handleInputChange}
                    placeholder="Repeat password"
                    className="w-4/5 flex mx-auto"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-4/5 flex mx-auto"
              >
                Finish registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default InviteJury
