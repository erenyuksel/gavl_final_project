import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../../store/slices/userSlice'
import SignUpMessage from '../SignUpMessage'
import JudgeAxios from '../../../axios/JudgeAxios'

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const emailRef = useRef(null)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const email = emailRef.current.value

    try {
      await JudgeAxios.post('/auth/registration/', { email })
      dispatch(setEmail(email))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="form-control w-full max-w-lg">
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-center pb-6 pt-10">
              REGISTRATION
            </h1>
            <input
              ref={emailRef}
              type="email"
              placeholder="E-Mail address...*"
              /* required */
              className="input input-bordered w-full max-w-lg"
            />
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </>
        ) : (
          <SignUpMessage />
        )}
      </form>
    </div>
  )
}

export default SignUp
