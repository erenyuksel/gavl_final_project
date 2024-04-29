import Logo from '../../assets/logo.png'

const LandingPageLeftSide = () => {
  return (
    <>
      {/* Left Side */}
      <div className="w-1/2 bg-gradient-to-b from-white to-logo flex flex-col justify-center items-center p-8 rounded-r-3xl shadow-2xl">
        <img src={Logo} alt="Gavl Logo" className="mb-6 max-w-sm" />
        <div className="text-xl text-center text-gray-700 mb-8 w-full">
          <h1>Revolution in Rating</h1>
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
    </>
  )
}

export default LandingPageLeftSide
