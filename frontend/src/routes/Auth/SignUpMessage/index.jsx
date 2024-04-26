import { useNavigate } from 'react-router-dom'

const SignUpMessage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="w-full max-w-lg p-4 text-center">
        <h1 className="text-center mb-6">REGISTRATION</h1>
        <p className="text-justify mx-auto mb-6">
          Thanks for your registration. You will receive an e-mail with a
          verification code. Our experience has shown, that our message often
          ends up in the Spam folder. Please find the verification code and
          enter it during your registration on the next page. Our apologies for
          any inconvenience.
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
