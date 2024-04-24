import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ProjectEvaluation from '../../../components/ProjectCreateEvaluation'
<<<<<<< HEAD
import ProjectValueProposition from '../../../components/ProjectValueProposition'
=======
import ProjectHeader from '../../../components/ProjectHeader'
>>>>>>> main

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
<<<<<<< HEAD
          <p>{projectData.name}</p>
          <ProjectEvaluation project={projectData} />
          <ProjectValueProposition project={projectData} />
=======
          <ProjectHeader project={projectData} />
          <ProjectEvaluation project={projectData} />
>>>>>>> main
        </>
      )}
    </>
  )
}

export default Project
