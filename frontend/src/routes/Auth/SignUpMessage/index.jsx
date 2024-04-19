import { useNavigate } from 'react-router-dom'

const SignUpMessage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-lg p-4 text-center">
        <h1 className="text-2xl font-bold pb-4 pt-10">REGISTRATION</h1>
        <p className="text-base pb-4">
          Thanks for your registration. Our hard working monkeys are preparing a
          digital message called E-Mail that will be sent to you soon. Since
          monkeys are not good in writing, the message could end up in your junk
          folder. Our apologies for any inconvenience.
        </p>
        <button
          onClick={() => navigate('/verification')}
          className="btn btn-primary mt-4"
        >
          Go to Verification
        </button>
      </div>
    </div>
  )
}

export default SignUpMessage
