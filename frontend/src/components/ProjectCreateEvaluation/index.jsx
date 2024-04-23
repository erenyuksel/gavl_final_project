import { useEffect, useState } from "react"
import JudgeAxios from "../../axios/JudgeAxios"
import { useDispatch, useSelector } from 'react-redux'


const ProjectEvaluation = ({ project }) => {
  const [eventData, setEventData] = useState()
  const [rubricsData, setRubricsData] = useState()
  const dispatch = useDispatch()
  const evaluationRedux = useSelector(state => state.evaluation.evaluation)
  const [evaluationData, setEvaluationData] = useState({})


  // getting the event for the project
  useEffect(() => {
    if (project) {
      const getProjectsEvent = async () => {
        const response = await JudgeAxios.get(`/projects/${project.id}/events`)
        if (response) {
          setEventData(response.data[0])
        }
      }
      getProjectsEvent()
    }
  }, [project])

  // getting the rubrics object for this event and storing it in a useState
  useEffect(() => {
    if (eventData) {
      const getEventRubrics = async () => {
        try {
          const response = await JudgeAxios.get(`/rubrics/${eventData.rubrics}`)
          if (response) {
            setRubricsData(JSON.parse(response.data.criteria_json))
          }
        } catch (error) {
          console.error(error)
        }
      }
      getEventRubrics()
    }
  }, [eventData])

  // check if there is already an evaluation from this user for this project and if not, create one to store evaluation
  // if there is a evaluation, load it into useState to represent the users selection
  useEffect(() => {
    const loadProjectEvaluation = async () => {


    }

    loadProjectEvaluation()


  }, [])


  const handleScaleChoice = (criteriaName, scaleValue) => {
    setEvaluationData(prevData => ({
      ...prevData,
      [criteriaName]: scaleValue
    }));
  }


  useEffect(() => {
    console.log(evaluationData)
  }, [evaluationData])
  return (
    <>
      {rubricsData && (
        <>
          {rubricsData.map(evaluationCriteria => {
            return (
              <>
                <div className="flex flex-col p-4 w-100 drop-shadow-md rounded border mb-5">
                  <div className="flex flex-col justify-center">
                    <span className="">{evaluationCriteria.name}</span>
                    <span>{evaluationCriteria.description}</span>
                  </div>
                  <div>
                    {evaluationCriteria.scales.map(scale => {
                      return (
                        <>
                        <div className={`flex flex-row m-2 bg-gray-100 shadow-sm rounded hover:bg-gray-300 transition duration-200 ease-in-out ${evaluationData[evaluationCriteria.name] == scale.value ? "bg-green-200" : ""}`} onClick={() => handleScaleChoice(evaluationCriteria.name, scale.value)}>
                            <span className="pr-4 bg-red-200 rounded pl-2 rounded-r-none flex items-center p-3">{scale.value}</span>
                            <span className="pl-4 flex items-center">{scale.description}</span>
                        </div>
                        </>
                      )
                    })}
                  </div>


                </div>
              </>

            )
          })}

        </>
      )}

    </>
  )


}

export default ProjectEvaluation