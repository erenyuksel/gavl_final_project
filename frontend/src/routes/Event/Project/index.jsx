import React, { useEffect, useState } from 'react'
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
import { PiArrowSquareLeft, PiArrowSquareRight } from 'react-icons/pi'
import ProjectLogo from '../../../components/ProjectLogo'
import ProblemSolution from '../../../components/ProblemSolution'
import ProjectBasicInfo from '../../../components/ProjectBasicInfo'

const Project = () => {
  const { id } = useParams()
  const [projectData, setProjectData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleEvaluation = () => {
    setIsOpen((prevState) => !prevState)
  }

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const response = await JudgeAxios.get(`/projects/${id}`)
        setProjectData(response.data)
      } catch (error) {
        console.error('Error fetching project data:', error)
      }
    }
    getProjectData()
  }, [id])

  return (
    <>
      {projectData && (
        <>
          <ProjectHeader project={projectData} />
          <div className="flex">
            <div className="flex-1 left-project-container w-100 flex-col items-center">
              <div className="w-full max-w-16xl p-4 flex flex-col items-center gap-6 bg-gold">
                <div className="card bg-base-100 shadow-xl w-full lg:w-2/3 xl:w-1/2 p-5">
                  {/* New button to toggle the collapsed section */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={toggleEvaluation}
                      className="btn btn-primary font-bold py-1 px-3 rounded flex items-center gap-1"
                    >
                      {isOpen ? (
                        <>
                          Evaluate
                          <PiArrowSquareLeft />
                        </>
                      ) : (
                        <>
                          Close
                          <PiArrowSquareRight />
                        </>
                      )}
                    </button>
                  </div>
                  {/* End of new button */}
                  <div>
                    <ProjectLogo project={projectData} />
                  </div>
                  {/* edit theme industry */}
                  <div className="flex justify-evenly">
                    <ProjectThemeIndustry project={projectData} />
                    {/* add value proposition here */}
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectValueProposition project={projectData} />
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectFinancial project={projectData} />
                    <ProjectBasicInfo project={projectData} />
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectBioMetric project={projectData} />
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectAffectedCard project={projectData} />
                  </div>
                  <div className="flex justify-evenly">
                    <ProblemSolution project={projectData}/>
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectSupportPriority project={projectData} />
                  </div>
                  <div className="flex justify-evenly">
                    <ProjectPersonOfContact project={projectData} />
                  </div>
                  <div className="flex justify-evenly"></div>
                </div>
              </div>
            </div>
            {!isOpen && (
              <div className="flex-1 collapsed-component">
                <div className="p-4 cursor-pointer" onClick={toggleEvaluation}>
                  <h2 className="text-lg font-bold mb-2">
                    Evaluation Criteria
                  </h2>
                </div>

                <div>
                  <ProjectEvaluation
                    project={projectData}
                    toggleEvaluation={toggleEvaluation}
                    showEvaluation={isOpen}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Project
