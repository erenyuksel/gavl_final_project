import { useNavigate } from 'react-router-dom'

const EventProjectCard = ({ project }) => {
  const navigate = useNavigate()
  const parsedContent = JSON.parse(project.content)

  const handleProjectView = (e) => {
    e.preventDefault()
    navigate(`/project/${project.id}`)
  }

  return (
    <>
      <div
        className="flex flex-col pt-3 items-center card card-side bg-base-100 shadow-xl cursor-pointer hover:bg-gray-100 ease-in-outj"
        onClick={handleProjectView}
      >
        <figure>
          {/* <img
            src={parsedContent.project_logo || { defaultProjectLogo }}
            // src={defaultProjectLogo}
            alt="Project logo"
            className="rounded-full h-20 w-20 mt-5"
          /> */}
          {parsedContent.project_logo ? (
            <div className="bg-inherit text-neutral-content rounded-full h-20 w-20">
              <img
                src={parsedContent.project_logo}
                alt={parsedContent.project_logo}
                className="object-contain h-full w-full"
              />
            </div>
          ) : (
            <div className="bg-primary text-black font-bold rounded-full h-20 w-20 flex items-center justify-center border">
              {parsedContent['name'].charAt(0).toUpperCase()}
            </div>
          )}
        </figure>
        <h2 className="card-title text-center mt-8">{project.name}</h2>
        <div className="card-body text-center">
          <p>{project.description}</p>
        </div>
      </div>
    </>
  )
}

export default EventProjectCard
