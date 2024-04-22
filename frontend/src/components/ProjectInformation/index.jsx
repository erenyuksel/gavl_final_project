import { useState, useEffect } from 'react'
import EventProjectCard from '../EventProjectCard'
import JudgeAxios from '../../axios/JudgeAxios'

const ProjectInformationSection = ({ project }) => {
  const [projectData, setProjectData] = useState({})

  useEffect(() => {
    setProjectData(project)
  }, [project])

  const handleUpdate = async () => {
    try {
      await JudgeAxios.patch(`/projects/${projectData.id}/`, projectData)
      // Handle successful update, e.g., show a success message
    } catch (error) {
      console.error(error)
      // Handle error, e.g., show an error message
    }
  }

  return (
    <>
      <EventProjectCard project={projectData} />
      <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Contestant Information</span>
        </div>
        <input
          type="text"
          name="name"
          value={projectData.name}
          placeholder="Project name"
          className="input input-ghost w-full max-w-xs"
          readOnly
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Project Description:</span>
        </div>
        <textarea
          name="description"
          value={projectData.description}
          placeholder="Project description"
          className="input input-ghost w-full max-w-xs"
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        ></textarea>
      </label>
      <button className="btn w-60 mt-12" onClick={handleUpdate}>
        Update Project
      </button>
    </>
  )
}

export default ProjectInformationSection
