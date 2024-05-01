const ProjectValueProposition = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <div className="card flex-row bg-base-100">
      <div className="card-body flex flex-col items-center">
        {/* Description */}
        <div className="card text-center mb-10 font-semibold text-lg flex-col">
          <h2>Value Proposition</h2>
          <p>"{parsedContent.description}"</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectValueProposition
