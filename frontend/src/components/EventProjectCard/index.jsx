import { useNavigate } from 'react-router-dom'

const EventProjectCard = ({ project }) => {
  const navigate = useNavigate()

  const handleProjectView = (e) => {
    e.preventDefault()
    navigate(`/project/${project.id}`)
  }
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{project.name}</h2>
          <p>Click the button see project page.</p>
          <p>Password: {project.password}</p>
          <p>Location: {project.location}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleProjectView}>
              See Project
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventProjectCard
