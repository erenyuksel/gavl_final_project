import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import JudgeAxios from "../../../axios/JudgeAxios"
import ProjectEvaluation from "../../../components/ProjectCreateEvaluation"
import ProjectHeader from "../../../components/ProjectHeader"

const Project = () => {
  const { id } = useParams()
  const [projectData, setProjectData] = useState()

  useEffect(() => {
    const getProjectData = async () => {
      const response = await JudgeAxios.get(`/projects/${id}`)
      setProjectData(response.data)
    }
    getProjectData()

  }, [id])

  return (
    <>
      {projectData && (
        <>
          <p>{projectData.name}</p>
          <ProjectEvaluation project={projectData} />
        </>
      )}
      {projectData && (
        <ProjectHeader
          name={projectData.name}
          description={projectData.description}
          logo={projectData.project_logo}
        />
      )}
    </>
  )
}

export default Project
