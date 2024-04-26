const ProjectFinancial = ({ project }) => {
  const parsedContent = JSON.parse(project.content)
  console.log(parsedContent)

  return (
    <>
      <div className="card flex-row bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center">Organization Financials</h2>
          <p className="text-center">
            <strong>Team size: </strong>
            {parsedContent['Team size']}
          </p>
          <p className="text-center">
            <strong>Stage of Maturity: </strong>
            {
              parsedContent[
                'What is the stage or maturity of your idea/project?'
              ]
            }
          </p>
          <p className="text-center">
            <strong>Profit/Non-Profit: </strong>
            {
              parsedContent[
                'Is your organisation for profit or not for profit?'
              ]
            }
          </p>
          <p className="text-center">
            <strong>Funding Stage: </strong>
            {
              parsedContent[
                'On what funding stage is your organization within the startup-journey?'
              ]
            }
          </p>
          <p className="text-center">
            <strong>
              Total Amount of Grant Funding Received Over The Past Twelve
              Months:{' '}
            </strong>
            {
              parsedContent[
                'Please share the total amount of grant funding that you have received over the past twelve months.'
              ]
            }
          </p>
          <p className="text-center">
            <strong>Total Amount of Non-Grant Received Funding: </strong>
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
