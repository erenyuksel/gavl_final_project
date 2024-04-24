const ProjectCard = ({ name, description, logo }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content ">
        <div className="max-w-2xl flex">
          <div className="bg-gray-50 size-[45rem]">
            <div className="avatar placeholder flex justify-around  mt-10 m-2">
              {logo ? (
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-neutral text-neutral-content rounded-full w-24 flex items-center justify-center">
                  <span className="text-3xl font-bold uppercase">{name.charAt(0)}</span>
                </div>
              )}
              <h1 className="mt-5 mb-9 text-4xl text-center text-gray-500 font-bold">
                {name}
              </h1>
            </div>
            <div className="flex justify-center">
              <p className="mb-5 text-center text-gray-500 size-[30rem] border">
                {description}
              </p>
            </div>
            <div className="flex justify-evenly text-gray-500">
              <button type="btn" className="btn">
                Judge
              </button>
              <button type="btn" className="btn">
                Edit
              </button>
              {/* <button type='btn' className='btn text-red-400'>Delete Contestant</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
