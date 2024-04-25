import { useState } from 'react'
import JudgeAxios from '../../../axios/JudgeAxios'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../../components/Alerts/ErrorMessage'
import { useSelector } from 'react-redux'
import Logo from '../../../assets/logo.png'

const Login = () => {
  const emailReduxStore = useSelector((state) => state.user.email) //call eMail from the store

  const [formData, setFormData] = useState({
    email: emailReduxStore || '',
    password: '',
  })
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await JudgeAxios.post('auth/token/', {
        email: formData.email,
        password: formData.password,
      })
      // Store Token in localstorage and navigate user to home screen
      localStorage.setItem('token', response.data.access)
      navigate('/')
    } catch (error) {
      setError(error.response.data.detail)
    } finally {
      setFormData({
        email: '',
        password: '',
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <>
      {error && (
        <>
          <ErrorMessage message={error} />
        </>
      )}
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-b from-white to-logo flex flex-col justify-center items-center p-8 rounded-r-3xl shadow-2xl">
          <img src={Logo} alt="Gavl Logo" className="mb-6 max-w-sm" />
          <div className="text-xl text-center text-gray-700 mb-8 w-full">
            <h1>"Revolution in Rating"</h1>
          </div>
          <div className="text-md text-center text-gray-600 w-full px-8">
            <div className="py-1 w-full">
              gavl is the premier platform for conducting fair and
            </div>
            <div className="py-1 w-4/5 mx-auto">
              efficient evaluations. Our application connects
            </div>
            <div className="py-1 w-3/5 mx-auto">
              panelists from diverse locations to
            </div>
            <div className="py-1 w-3/5 mx-auto">
              meticulously assess contestants
            </div>
            <div className="py-1 w-2/5 mx-auto"> based on predefined</div>
            <div className="py-1 w-1/5 mx-auto">criteria.</div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-ms flex flex-col">
              <h1 className="text-center mb-10">Welcome back!</h1>
              <label className="input input-bordered flex items-center gap-2 mb-4 border-custom-primary  bg-input-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  name="email"
                  className="border-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-4 border-custom-primary  bg-input-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="border-none"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>

              <div className="mt-4 text-center">
                <span>Don't have an account yet? </span>
                <Link to="/sign-up" className="link link-primary">
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
