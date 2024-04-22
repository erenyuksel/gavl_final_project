import { useState } from "react"
import ProjectInformationSection from "../../../components/ProjectInformation"


const Project = () => {
  const [projectData, setProjectData] = useState({})

return (
    <>
    <ProjectInformationSection project={projectData} />
    </>
)
}

export default Project
