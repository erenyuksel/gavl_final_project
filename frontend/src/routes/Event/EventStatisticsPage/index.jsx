import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import JudgeAxios from "../../../axios/JudgeAxios"


const EventStatisticPage = () => {
  const {id} = useParams()
  const [eventData, setEventData] = useState()
  const [projectTableData, setProjectTableData] = useState([])
  const [evaluationCriteriaNames, setEvaluationCriteriaNames] = useState()
  const [projectJudgeData, setProjectJudgeData] = useState([])

  // initially gets the event data to create statisticstable
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await JudgeAxios.get(`events/${id}/`)
        setEventData(response.data)
      } catch (err) {
        console.error('Failed loading Event Data with id', err)
      }
    }
    getEventData()
  }, [id])


  useEffect(() => {
    if (eventData) {
      const createEventEvaluationTable = async () => {
        try {
          // call the events rubric, to store the evaluation criterias in a variable and the amount of criterias
          const eventRubrics_response = await JudgeAxios.get(`/rubrics/${eventData.rubrics}`)
          const evaluationCriterias = JSON.parse(eventRubrics_response.data.criteria_json)
          const amountOfCriterias = evaluationCriterias.length
          const evaluationCriteriaNames = Object.values(evaluationCriterias).map(item => item.name)
          setEvaluationCriteriaNames(evaluationCriteriaNames)
          let tempArr = []
          
          // iterating over all projects of event
          for (let project of eventData.projects) {
            // creating a new obj to store all the needed information for the table
            const projectObj = {}
            // storing the project name as name and the logo as logo
            projectObj.name = project.name
            projectObj.logo = project.project_logo
            projectObj.id = project.id

            // calling the evaluations endpoint to get all the evaluations for this Project
            const evaluations_response = await JudgeAxios.get(`/projects/${project.id}/evaluations`)
            
            // initiating the amoutn of judges field, which is increased for each complete evaluation
            projectObj.amount_of_judges = 0
            projectObj.total_score = 0
            projectObj.completed_judges = []

            // initiating the evaluation criteria fields in the projectObj
            for (let evaluationName of evaluationCriteriaNames) {
              projectObj[`${evaluationName}_score`] = 0
            }

            // for each evaluation, parse the json data holding the scores
            for (let evaluation of evaluations_response.data) {
              const parsedEvaluationScores = JSON.parse(evaluation.json_data_rating)
              // check then if the evaluation is complete, only respect complete evaluations
              if (Object.keys(parsedEvaluationScores).length === amountOfCriterias) {
                // if evaluation is complete increase amount of judges score by one
                projectObj.amount_of_judges = projectObj.amount_of_judges + 1
                // store the id of the judge which has completed the evaluation of this project in the obj
                projectObj.completed_judges.push(evaluation.judge.id)
                // add all the scores together, devide them by the amount of criterias and add the total to the
                // total score field on the projectObj
                const evaluationsAverageScore = Object.values(parsedEvaluationScores).reduce((acc, curr) => Number(acc) + Number(curr), 0) / amountOfCriterias
                projectObj.total_score = projectObj.total_score + evaluationsAverageScore
                // add each individual evaluation criteria score to the related field on the object
                for (let evl_criteria_key in parsedEvaluationScores) {
                  projectObj[`${evl_criteria_key}_score`] = projectObj[`${evl_criteria_key}_score`] + Number(parsedEvaluationScores[evl_criteria_key])
                }
              }
            }

            // dividing the total score by the amount of judges to get the total average for the whole project
            projectObj.total_score = projectObj.total_score / projectObj.amount_of_judges

            // iterating over the evaluation criteria scores and deviding them as well by the amount of judges
            for (let evaluationName of evaluationCriteriaNames) {
              projectObj[`${evaluationName}_score`] = projectObj[`${evaluationName}_score`] / projectObj.amount_of_judges
            }

            tempArr = [...tempArr, projectObj]
          }

          // storing the projectObj in the useState to populate the table
          setProjectTableData(tempArr)

        } catch (err) {
          console.error('Failed creating evaluation table', err)
        }
      }
      createEventEvaluationTable()
    }
  }, [eventData])

  // adding sorting functionality
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (key) => {
    if (sortBy === key) {
      // Toggle sort order if the same column is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Sort by the selected column
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const sortedData = projectTableData.sort((a, b) => {
    if (sortBy === 'name') {
      const aValue = a.name.toLowerCase();
      const bValue = b.name.toLowerCase();
      const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;
      if (aValue < bValue) return -1 * sortOrderMultiplier;
      if (aValue > bValue) return 1 * sortOrderMultiplier;
      return 0;
    } else {
      const aValue = isNaN(a[sortBy]) ? 0 : a[sortBy];
      const bValue = isNaN(b[sortBy]) ? 0 : b[sortBy];
      const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;
      return (aValue - bValue) * sortOrderMultiplier;
    }
  });


  const handleJudgesView = async (project) => {
    if (project) {
      try {
        const eventRubrics_response = await JudgeAxios.get(`/rubrics/${eventData.rubrics}`)
        const evaluationCriterias = JSON.parse(eventRubrics_response.data.criteria_json)
        const evaluationCriteriaNames = Object.values(evaluationCriterias).map(item => item.name)

      } catch (err) {
        console.error('Failed creating the evaluation criteria list for the judge view', err)
      }

      let tempArr = []
      for (let judge of project.completed_judges) {
        const tempObj = {}
        // storing the ordered evaluationCriterias so we can show it in the correct order in table
        tempObj.evaluationCriteriaOrder = evaluationCriteriaNames
        // storing the project Name on the objecst so we can show it in table header
        tempObj.projectName = project.name
        try {
          // iterating through all the judges, getting their userdata
          const judge_response = await JudgeAxios.get(`users/${judge}`)
          // store first and lastname in tempObj
          tempObj.fullname = `${judge_response.data.first_name} ${judge_response.data.last_name}`
          // getting the judges evaluation for this project
          const evaluation_response = await JudgeAxios.get(`/projects/${project.id}/evaluations`)
          const judges_evaluation = evaluation_response.data.filter(evaluation => {
            return evaluation.judge.id === judge
          })
          // store all the scores on the tempobj
          const evaluationData = JSON.parse(judges_evaluation[0].json_data_rating)
          console.log("🚀 ~ handleJudgesView ~ evaluationData:", evaluationData)
          tempObj.evaluation_scores = evaluationData
          // calculating the overall score of the judge and add it as well to the tempobj
          
          tempObj.total_score = project.total_score
          // adding the tempobj to the judge useState
          tempArr = [...tempArr, tempObj]
        } catch (err) {
          console.error('Failed loading the judges evaluation', err)
        }
      }
      setProjectJudgeData(tempArr)
    }
  }

  const handleClearProjectJudgeData = () => {
    setProjectJudgeData([])
  }



  return (
    <>
    {projectJudgeData.length > 0 && (
      <div className="w-100 flex flex-col items-center">
      
      <div className="overflow-x-auto w-3/4 card bg-base-100 shadow-xl p-3">
        <h2>Panelist information for contestant {projectJudgeData[0].projectName}</h2>
        <p className="mb-5">Panelists in this table have completed their evaluation for this contestant</p>
        <table className="table">
        <thead>
          <tr>
            <th>Panelist name</th>
            {projectJudgeData[0].evaluationCriteriaOrder.map(criteria => {
              return <th key={criteria}>{criteria}</th>
            })}
            <th>Overall Score</th>
          </tr>
        </thead>
          {projectJudgeData.map(judge => {
            return (
              <>
                <tbody>
                  <tr>
                    <td className="font-bold">{judge.fullname}</td>
                    {judge.evaluationCriteriaOrder.map(criteria => {
                      return <td key={criteria}>{judge.evaluation_scores[`${criteria}`]}</td>
                    })}
                    <td>{judge.total_score ? judge.total_score.toFixed(1) : 0}</td>
                  </tr>
                </tbody>
              </>
            )
          })}
        </table>
        <div className="flex m-4 justify-center">
        <button className="btn btn-primary" onClick={handleClearProjectJudgeData}>Hide Projects panelist info</button>
        </div>
        </div>
      </div>
    )}
    {(evaluationCriteriaNames && projectJudgeData.length === 0) && (
      <div className="w-100 flex justify-center">
        <div className="overflow-x-auto w-3/4 card bg-base-100 shadow-xl p-3">
        <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} >Project Name</th>
            <th>Complete Evaluations</th>
            {evaluationCriteriaNames.map(criteria => {
              return <th key={criteria} onClick={() => handleSort(`${criteria}_score`)}>{criteria}</th>
            })}
            <th onClick={() => handleSort('total_score')}>Overall Score</th>
            <th></th>
          </tr>
        </thead>
        {projectTableData && (
          <>
          {sortedData.map(project => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={project.logo} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{project.name}</div>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => handleJudgesView(project)}>{project.amount_of_judges} / {eventData.judges.length}</td>
                    {evaluationCriteriaNames.map(criteria => {
                      return <td key={criteria}>{project[`${criteria}_score`] ? project[`${criteria}_score`].toFixed(1) : 0}</td>
                    })}
                    <td>{project.total_score ? project.total_score.toFixed(1) : 0}</td>
                  </tr>
                </tbody>
              </>
            )
          })}
          </>
          )}
        </table>
        </div>
      </div>
    )}
    </>
  )
}

export default EventStatisticPage