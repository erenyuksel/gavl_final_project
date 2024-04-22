import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import { useSelector } from 'react-redux'

const Verification = () => {
  const emailReduxStore = useSelector((state) => state.user.email) //call eMail from the store
  const [email, setEmail] = useState(emailReduxStore || '') //use email as initial value
  const [validationCode, setValidationCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [username, setUsername] = useState('')

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
      })
      navigate('/login')
    } catch (error) {
      console.error('Validation error:', error.response?.data || error.message)
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-8">
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-lg p-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">VERIFICATION</h1>
        <div className="form-control w-full">
          <label className="input-group">
            <span className="w-32">E-Mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail address"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Code</span>
            <input
              type="text"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
              placeholder="Validation code"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="input input-bordered w-full"
              required
            />
            <label className="input-group">
              <span className="w-32">Username</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input input-bordered w-full"
                required
              />
            </label>
          </label>
          <label className="input-group">
            <span className="w-32">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="input-group">
            <span className="w-32">Repeat</span>
            <input
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
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

export default Verification
