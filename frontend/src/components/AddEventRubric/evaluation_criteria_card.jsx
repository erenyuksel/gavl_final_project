import EvaluationCriteriaScale from "./evaluation_criteria_scale"
import PropTypes from 'prop-types';


const EvaluationCriteriaCard = ({obj}) => {

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

EvaluationCriteriaCard.propTypes = {
  obj: PropTypes.object.isRequired,
}

export default EvaluationCriteriaCard