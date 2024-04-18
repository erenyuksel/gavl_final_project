import EvaluationCriteriaScale from "./evaluation_criteria_scale"


const EvaluationCriteriaCard = ({obj}) => {

  console.log(obj)
  return(
    <>
    <p>{obj.name}</p>
    <p>{obj.description}</p>
    {obj.scales.map(scale => {
      return <EvaluationCriteriaScale obj={scale} key={scale.uuid} />
    })}
    </>
  )
}

export default EvaluationCriteriaCard