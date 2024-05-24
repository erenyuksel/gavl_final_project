import { useEffect, useState } from 'react'
import JudgeAxios from '../../axios/JudgeAxios'
import { useParams } from 'react-router-dom'

const ProjectDelete = () => {
  const [projectData, setProjectData] = useState([])
  const { id } = useParams

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await JudgeAxios.get(`projects/${id}`)
        setProjectData(response.data)
      } catch (error) {
        console.error('Error finding projects:', error)
      }
    }

    getProjectData()
  }, [])

  const handleDeleteProject = async (id) => {
    try {
      await JudgeAxios.delete(`projects/${id}/`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card border">
      <h1>Delete Project</h1>
      {projectData.length > 0 ? (
        <ul>
          {projectData.map((projects) => (
            <li key={projects.id}>{projects.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProjectDelete
