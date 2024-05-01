import { useNavigate } from 'react-router-dom'
import defaultProjectLogo from '../../assets/default_project_logo.jpeg'


const EventProjectCard = ({ project }) => {
  const navigate = useNavigate()

  const handleProjectView = (e) => {
    e.preventDefault()
    navigate(`/project/${project.id}`)
  }

  return (
    <>
      <div className="flex flex-col pt-3 items-center card card-side bg-base-100 shadow-xl cursor-pointer hover:bg-gray-100 ease-in-outj" onClick={handleProjectView}>
        <figure>
          <img
            // src={project.project_logo || "../../assets/default_project_logo.jpeg"}
            src={project.project_logo || defaultProjectLogo}
            alt="Project logo"
            className='rounded-full h-20 w-20 mt-5'
          />
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
