import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import JudgeAxios from "../../../axios/JudgeAxios"
import EventProjectCard from "../../../components/EventProjectCard"
import AddNewProject from "../AddNewProject"

const ListProjectPage = (project_id) => {
    const [project, setProject] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await JudgeAxios.get('/project/')
                setProject(response.data)
            } catch (error) {
                console.error('Could not fetch projects', error)
            }
        }

        fetchProjects()
    }, [])

    return (
    <div className="flex justify-center items-center h-[92vh] overflow-hidden">
      <div className="w-full max-w-15xl p-4 flex flex-col items-center gap-6">
        {project.map((p) => (
          <EventProjectCard
            key={p.id}
            title={p.name}
            description={p.description}
            project_id={p.id}
          />
        ))}
        <Link to={`/project/${project_id}`} className="btn w-60 mt-12">
          View Contestant
        </Link>
        <AddNewProject />
 
      </div>
    </div>
  )
}

export default ListProjectPage;