const ProjectBioMetric = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Key non-financial nature/biodiversity metric
          </h2>
          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (1)']}
          </p>
          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (2)']}
          </p>
          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (3)']}
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  )
}

export default ProjectBioMetric
