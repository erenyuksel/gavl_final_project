const EvaluationCriteriaScale = ({ obj }) => {
  return (
    <>
      <div className="flex  border  space-x-3 mt-4 ">
        <table className="table table-zebra">
          <th className="bg-primary text-gray-100 w-8">{obj.value}</th>
          <td>{obj.description}</td>
        </table>
      </div>
    </>
  )
}

export default EvaluationCriteriaScale
