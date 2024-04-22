import { useState } from "react"
import EventProjectCard from "../EventProjectCard"

// const [projectData, setProjectData] = useState({})

const ProjectInformationSection = ({ project }) => {

  return (
    <>
    <EventProjectCard project={projectData}/>
      <h1>Project Information</h1>
      <div>Project Avatar</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Project name:</span>
        </div>
        <input
          type="text"
          name="name"
          value={project.name}
          placeholder="Project name"
          className="input input-ghost w-full max-w-xs"
        />
      </label>
      {/* JSON field */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Project Content:</span>
        </div>
        <input
          type="text"
          name="description"
          value={project.description}
          placeholder="Project content"
          className="input input-ghost w-full max-w-xs"
        />
        {/* Add description and logo section */}
      </label>
    </>
  )
}

export default ProjectInformationSection
