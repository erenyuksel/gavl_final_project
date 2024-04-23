import { useEffect, useState } from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../../store/slices/userSlice'

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
      console.log('Patch user invite:', response)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-8">
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-lg p-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Hello {userInviteData.username}
        </h1>
        <div className="form-control w-full">
          <label className="input-group">
            <span className="w-32">E-Mail</span>
            <input
              type="email"
              name="email"
              value={userInviteData.email}
              onChange={handleInputChange}
              placeholder="E-Mail address"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Password</span>
            <input
              type="password"
              name="password"
              value={userInviteData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Repeat</span>
            <input
              type="password"
              name="passwordRepeat"
              value={userInviteData.passwordRepeat}
              onChange={handleInputChange}
              placeholder="Repeat password"
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-full">
          Finish registration
        </button>
      </form>
    </div>
  )
}

export default InviteJury
