const ProjectValueProposition = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row bg-base-100">
        <div className="card-body flex flex-col items-center">
          <div className="items-center w-80 border-b-4 border-gray-200 mb-4"></div>
          {/* Description */}
          <div className="card text-center mb-5 font-semibold text-lg flex-col">
            <h2>Value Proposition</h2>
            <p>"{parsedContent.description}"</p>
          </div>
          <div className="items-center w-80 border-b-4 border-gray-200"></div>
        </div>
      </div>
    </>
  )
}

export default ProjectValueProposition
