// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import JudgeAxios from '../../../axios/JudgeAxios'
// import ProjectEvaluation from '../../../components/ProjectCreateEvaluation'
// import ProjectValueProposition from '../../../components/ProjectValueProposition'
// import ProjectHeader from '../../../components/ProjectHeader'
// import ProjectPersonOfContact from '../../../components/ProjectPersonOfContact'
// import ProjectBioMetric from '../../../components/ProjectBioMetric'
// import ProjectFinancial from '../../../components/ProjectFinancial'
// import ProjectAffectedCard from '../../../components/ProjectAffectedCard'
// import ProjectSupportPriority from '../../../components/ProjectSupportPriority'
// import ProjectThemeIndustry from '../../../components/ProjectThemeIndustry'

// const Project = () => {
//   const [showEvaluation, setShowEvaluation] = useState(false)
//   const { id } = useParams()
//   const [projectData, setProjectData] = useState()
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleEvaluation = () => {
//     setShowEvaluation((prevState) => !prevState)
//   }

//   useEffect(() => {
//     const getProjectData = async () => {
//       const response = await JudgeAxios.get(`/projects/${id}`)
//       setProjectData(response.data)
//     }
//     getProjectData()
//   }, [id])

//   return (
//     <>
//       {projectData && (
//         <>
//           <ProjectHeader project={projectData} />
//           <div className="flex">
//             <div className="flex-1">
//               <div className="flex justify-evenly">
//                 <ProjectPersonOfContact project={projectData} />
//               </div>
//               <div className="flex justify-evenly">
//                 <ProjectValueProposition project={projectData} />
//               </div>
//               <div className="flex justify-evenly">
//                 <ProjectBioMetric project={projectData} />
//               </div>
//               <div className="flex justify-evenly">
//                 <ProjectFinancial project={projectData} />
//               </div>
//               <div className="flex justify-evenly">
//                 <ProjectThemeIndustry project={projectData} />
//               </div>
//               <div className="flex justify-evenly">
//                 <div className="flex justify-evenly">
//                   <ProjectAffectedCard project={projectData} />
//                 </div>
//                 <ProjectSupportPriority project={projectData} />
//               </div>
//               <div className="flex justify-evenly"></div>
//             </div>
//             <div className="flex-1 border">
//               <div className="p-4 cursor-pointer" onClick={toggleEvaluation}>
//         <h2 className="text-lg font-bold mb-2">Evaluation</h2>
//         {showEvaluation && (
//           <div>
//             <ProjectEvaluation
//               project={projectData}
//               toggleEvaluation={toggleEvaluation}
//               showEvaluation={showEvaluation}
//             />
//           </div>
//         )}
//       </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// export default Project
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
            <div className="flex-1 left-project-container">
              {/* New button to toggle the collapsed section */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={toggleEvaluation}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded flex items-center gap-1"
                >
                  {isOpen ? (
                    <>
                      Evaluation
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
              <div className="flex justify-evenly">
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
              <div className="flex justify-evenly"></div>
            </div>
            {!isOpen && (
              <div className="flex-1 border collapsed-component">
                <div className="p-4 cursor-pointer" onClick={toggleEvaluation}>
                  <h2 className="text-lg font-bold mb-2">Evaluation</h2>
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
