import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useSelector } from 'react-redux'
import LandingPageLeftSide from '../../../components/LandingPageLeftSide'

const Verification = () => {
  const emailReduxStore = useSelector((state) => state.user.email) //call eMail from the store
  const [email, setEmail] = useState(emailReduxStore || '') //use email as initial value
  const [validationCode, setValidationCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [username, setUsername] = useState('')
  const [organisationName, setOrganisationName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== passwordRepeat) {
      alert('Passwords do not match!')
      return
    }

    try {
      await JudgeAxios.patch('/auth/registration/validation/', {
        email,
        code: validationCode,
        first_name: firstName,
        last_name: lastName,
        password,
        password_repeat: passwordRepeat,
        username,
        organisation_name: organisationName,
        role: 'Organisation Admin',
      })
      navigate('/login')
    } catch (error) {
      console.error('Validation error:', error.response?.data || error.message)
    }
  }

  return (
    <div className="flex min-h-screen">
      <LandingPageLeftSide />
      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
          <form onSubmit={handleSubmit} className="form-control w-full p-4">
            <h1 className="text-center mb-6">Verification</h1>
            <div className="form-control w-full">
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail address*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="text"
                  value={validationCode}
                  onChange={(e) => setValidationCode(e.target.value)}
                  placeholder="Verification code*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  placeholder="Repeat password*"
                  className=""
                  required
                />
              </label>
              <label className="flex input-group w-3/4 mb-4 mx-auto">
                <input
                  type="text"
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                  placeholder="Name of Organisation*"
                  className=""
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-3/4 mx-auto"
            >
              Finish registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Verification
