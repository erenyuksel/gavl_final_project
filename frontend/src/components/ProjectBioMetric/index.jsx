const ProjectBioMetric = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center">
            Key Non-Financial Nature/Biodiversity Metric
          </h2>
          <div className="text-center">

          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (1)']}
          </p>
          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (2)']}
          </p>
          <p>
            {parsedContent['Key non-financial nature/biodiversity metric (3)']}
          </p>
          </div>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  )
}

export default ProjectBioMetric
