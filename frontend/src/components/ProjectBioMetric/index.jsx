const ProjectBioMetric = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row bg-base-100 w-full">
        <div className="card-body flex items-center">
          <div className="flex justify-center w-80 border-b-4 border-gray-200 mb-4"></div>
          <h2 className="card-title justify-center">
            Key Non-Financial Nature/Biodiversity Metric
          </h2>
          <div className="text-center">
            <p>
              {
                parsedContent[
                  'Key non-financial nature/biodiversity metric (1)'
                ]
              }
            </p>
            <p>
              {
                parsedContent[
                  'Key non-financial nature/biodiversity metric (2)'
                ]
              }
            </p>
            <p>
              {
                parsedContent[
                  'Key non-financial nature/biodiversity metric (3)'
                ]
              }
            </p>
          </div>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  )
}

export default ProjectBioMetric
