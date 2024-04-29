import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../../store/slices/userSlice'
import SignUpMessage from '../SignUpMessage'
import JudgeAxios from '../../../axios/JudgeAxios'
import LandingPageLeftSide from '../../../components/LandingPageLeftSide'
import ErrorMessage from '../../../components/Alerts/ErrorMessage'

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const emailRef = useRef(null)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [errorTimeout, setErrorTimeout] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const email = emailRef.current.value

    if (!email) {
      setError('Please enter your e-mail address')
      // Set Timer
      const timeoutId = setTimeout(() => {
        setError(null)
      }, 3000)
      setErrorTimeout(timeoutId) // Save des Timer-Identifikators
      return
    }

    try {
      await JudgeAxios.post('/auth/registration/', { email })
      dispatch(setEmail(email))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Registration error:', error)
      setError('Registration failed. Please try again')
    }
  }

  useEffect(() => {
    // Cleanup for error timeout
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }
    }
  }, [errorTimeout])

  return (
    <div className="flex min-h-screen relative">
      <LandingPageLeftSide />
      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center">
        {/* Error Message Container */}
        {error && (
          <div className="fixed inset-y-0 right-0 w-1/2 top-0  h-4 z-50">
            <ErrorMessage message={error} className="text-center py-3" />
          </div>
        )}
        {/*  <div className="flex min-h-screen"> */}

        <div className="flex min-h-full w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="form-control w-full p-4 flex mx-auto"
          >
            {/* For background autofill */}
            <style jsx>{`
              input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
                -webkit-text-fill-color: inherit !important;
                background-color: transparent !important;
              }
            `}</style>

            {!isSubmitted ? (
              <>
                <h1 className="text-center m-1.5">Registration</h1>
                <p className="text-center w-3/4 mx-auto mb-4">
                  Please register to create your event.
                </p>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="E-Mail address...*"
                  /* required */
                  className="w-3/5 flex mx-auto m-2"
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-3/5 flex mx-auto"
                >
                  Register
                </button>
              </>
            ) : (
              <SignUpMessage />
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
