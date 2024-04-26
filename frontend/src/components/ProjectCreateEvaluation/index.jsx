import { useEffect, useState } from 'react'
import JudgeAxios from '../../axios/JudgeAxios'

const ProjectEvaluation = ({ project }) => {
  const [eventData, setEventData] = useState()
  const [rubricsData, setRubricsData] = useState()
  const [evaluationData, setEvaluationData] = useState({})
  const [rubricsId, setRubricsId] = useState()
  const [userData, setUserData] = useState()
  const [projectEvaluations, setProjectEvaluations] = useState()
  const [checkedForEvaluations, setCheckedForEvaluations] = useState(false)

  // when site is loaded, get user and evaluation information and store it in usestates
  useEffect(() => {
    const getBasicInfos = async () => {
      try {
        const user_response = await JudgeAxios.get('users/me')
        setUserData(user_response.data)
      } catch (error) {
        console.error('Error getting user information'.error)
      }
    }
    getBasicInfos()
    getcurrentProjectEvaluations()
  }, [])

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
            setRubricsId(response.data.id)
            setRubricsData(JSON.parse(response.data.criteria_json))
          }
        } catch (error) {
          console.error(error)
        }
      }
      getEventRubrics()
    }
  }, [eventData])

  // updating the projects evaluations and store it in useState
  const getcurrentProjectEvaluations = async () => {
    try {
      const proj_ev_response = await JudgeAxios.get(
        `projects/${project.id}/evaluations`,
      )
      setProjectEvaluations(proj_ev_response.data)
    } catch (error) {
      console.error('Error getting the project evaluations')
    }
  }

  const loadUsersEvaluation = () => {
    setCheckedForEvaluations(true)
    if (projectEvaluations) {
      const usersEvaluation = projectEvaluations.filter((evaluation) => {
        return evaluation.judge.id === userData.id
      })
      try {
        if (usersEvaluation[0].json_data_rating !== undefined) {
          try {
            if (Object.keys(evaluationData).length === 0) {
              const existingEvaluationData = JSON.parse(
                usersEvaluation[0].json_data_rating,
              )
              setEvaluationData(existingEvaluationData)
            }
          } catch (error) {
            console.warn(
              'Failed to parse existing evaluation, user seems to have no evaluation',
              error,
            )
          }
        }
      } catch (error) {
        console.warn(
          'User seems to have an existing Evaluation but no evalution data inside it.',
        )
      }
    }
  }

  useEffect(() => {
    // filter the project evaluations by the users id
    if (projectEvaluations) {
      const usersEvaluation = projectEvaluations.filter((evaluation) => {
        return evaluation.judge.id === userData.id
      })

      if (usersEvaluation.length > 0) {
        const updateEvaluation = async () => {
          try {
            const up_ev_response = await JudgeAxios.patch(
              `/evaluations/${usersEvaluation[0].id}`,
              {
                json_data_rating: JSON.stringify(evaluationData),
              },
            )
          } catch (error) {
            console.error('Failed updating existing evaluation', error)
          }
        }
        updateEvaluation()
      } else {
        const createEvaluation = async () => {
          try {
            const create_ev_response = await JudgeAxios.post('/evaluations/', {
              rubrics: [rubricsId],
              json_data_rating: JSON.stringify(evaluationData),
              project: project.id,
            })
            getcurrentProjectEvaluations()
          } catch (error) {
            console.error('Failed creating a new evaluation', error)
          }
        }
        createEvaluation()
      }
    }
  }, [evaluationData, project])

  const handleScaleChoice = (criteriaName, scaleValue) => {
    setEvaluationData((prevData) => ({
      ...prevData,
      [criteriaName]: scaleValue,
    }))
  }

  useEffect(() => {
    if (projectEvaluations) {
      loadUsersEvaluation()
    }
  }, [projectEvaluations])

  return (
    <>
      {rubricsData && checkedForEvaluations && (
        <>
          {rubricsData.map((evaluationCriteria) => {
            return (
              <>
                <div
                  key={evaluationCriteria.name}
                  className="flex flex-col p-4 w-100 drop-shadow-md rounded border mb-5"
                >
                  <div className="flex flex-col justify-center">
                    <span className="">{evaluationCriteria.name}</span>
                    <span>{evaluationCriteria.description}</span>
                  </div>
                  <div>
                    {evaluationCriteria.scales.map((scale) => {
                      return (
                        <>
                          <div
                            key={scale.uuid}
                            className={`cursor-pointer flex flex-row m-2 bg-gray-100 shadow-sm rounded-full hover:bg-gray-300 transition duration-200 ease-in-out ${evaluationData[evaluationCriteria.name] == scale.value ? 'bg-green-200' : ''}`}
                            onClick={() =>
                              handleScaleChoice(
                                evaluationCriteria.name,
                                scale.value,
                              )
                            }
                          >
                            <span className="pr-4 bg-primary text-white rounded pl-3 rounded-r-none flex p-3">
                              {scale.value}
                            </span>
                            <span className="pl-4 flex items-center">
                              {scale.description}
                            </span>
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
