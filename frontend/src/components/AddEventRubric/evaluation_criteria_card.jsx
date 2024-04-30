import EvaluationCriteriaScale from './evaluation_criteria_scale'
import PropTypes from 'prop-types'

const EvaluationCriteriaCard = ({ obj }) => {
  return (
    <>
      <table className="table ">
        <tbody>
          <tr>
            <div className="flex flex-col  p-14 pt-1 m-5  ">
              <h3 className="text-start mt-7 font-semibold italic">
                {obj.name}
              </h3>
              <td className="text-start pl-0">{obj.description}</td>

              {obj.scales.map((scale) => (
                <EvaluationCriteriaScale obj={scale} key={scale.uuid} />
              ))}
            </div>
          </tr>
        </tbody>
      </table>
    </>
  )
}

EvaluationCriteriaCard.propTypes = {
  obj: PropTypes.object.isRequired,
}

export default EvaluationCriteriaCard
