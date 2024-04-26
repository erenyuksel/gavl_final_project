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

        {/* Content: Problem on the left, Solution on the right */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Problem */}
          <div className="w-full md:w-1/2 md:pr-6 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Problem</h3>
            <p className="text-gray-700">
              {parsedContent['What is the problem you address?']}
            </p>
          </div>

          {/* Solution */}
          <div className="w-full md:w-1/2 md:pl-6">
            <h3 className="text-xl font-semibold mb-4">Solution</h3>
            <p className="text-gray-700">
              {parsedContent['What is your solution/product/service?']}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectValueProposition
