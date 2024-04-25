const ProjectFinancial = ({ project }) => {
  const parsedContent = JSON.parse(project.content)
  console.log(parsedContent)

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            Organization Financials
          </h2>
          <p className="text-center">Team size: {parsedContent['Team size']}</p>
          <p className="text-center">
            {
              parsedContent[
                'What is the stage or maturity of your idea/project?'
              ]
            }
          </p>
          <p className="text-center">
            {
              parsedContent[
                'Is your organisation for profit or not for profit?'
              ]
            }
          </p>
          <p className="text-center">
            {
              parsedContent[
                'On what funding stage is your organization within the startup-journey?'
              ]
            }
          </p>
          <p className="text-center">
            Total amount of grant funding:{' '}
            {
              parsedContent[
                'Please share the total amount of grant funding that you have received over the past twelve months.'
              ]
            }
          </p>
          <p className="text-center">
            Total Amount of grant raised:{' '}
            {
              parsedContent[
                'If you have raised any funds that are not grants please share the total amount raised to date.'
              ]
            }
          </p>
        </div>
      </div>
    </>
  )
}

export default ProjectFinancial
