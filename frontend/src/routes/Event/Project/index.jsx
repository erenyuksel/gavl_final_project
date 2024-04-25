import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import JudgeAxios from '../../../axios/JudgeAxios'
import ProjectEvaluation from '../../../components/ProjectCreateEvaluation'
import ProjectValueProposition from '../../../components/ProjectValueProposition'
import ProjectHeader from '../../../components/ProjectHeader'
import ProjectPersonOfContact from '../../../components/ProjectPersonOfContact'
import ProjectBioMetric from '../../../components/ProjectBioMetric'
import ProjectFinancial from '../../../components/ProjectFinancial'
import ProjectAffectedCard from '../../../components/ProjectAffectedCard'
import ProjectSupportPriority from '../../../components/ProjectSupportPriority'
import ProjectThemeIndustry from '../../../components/ProjectThemeIndustry'

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
          <ProjectHeader project={projectData} />
          <div className="flex">
            <div className="flex-1">
              <div className='flex justify-evenly'>
                <ProjectPersonOfContact project={projectData} />
              </div>
              <div className="flex justify-evenly">
                <ProjectValueProposition project={projectData} />
              </div>
              <div className="flex justify-evenly">
                <ProjectBioMetric project={projectData} />
              </div>
              <div className="flex justify-evenly">
                <ProjectFinancial project={projectData} />
              </div>
              <div className="flex justify-evenly">
                <ProjectThemeIndustry project={projectData} />
              </div>
                <div className="flex justify-evenly">
              <div className="flex justify-evenly">
                <ProjectAffectedCard project={projectData} />
              </div>
                  <ProjectSupportPriority project={projectData} />
                </div>
              <div className="flex justify-evenly">
              </div>
            </div>
            <div className="flex-1 border">
                  <ProjectEvaluation project={projectData} />
                </div>
          </div>
        </>
      )}
    </>
  )
}

export default Project
