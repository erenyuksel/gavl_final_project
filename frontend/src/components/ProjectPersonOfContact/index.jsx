const ProjectPersonOfContact = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row w-96 bg-base-100">
        <div className="card-body items-center text-center justify-center">
          <div className="avatar placeholder">
            {parsedContent.logo ? (
              <div className="bg-neutral text-neutral-content rounded-full w-24">
                <img src={parsedContent.logo} alt={parsedContent.name} />
              </div>
            ) : (
              <div className="bg-primary text-black rounded-full w-24 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {parsedContent['Contact Person'].charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <h2 className="card-title">{parsedContent['Contact Person']}</h2>
          <p>
            <strong>Position:</strong>{' '}
            {parsedContent['Position of Contact Person']}
          </p>
          <p>
            <strong>HQ: </strong>
            {parsedContent['HQ of organization (City; Country)']}
          </p>
          <p>
            <strong>Founding Year: </strong>
            {parsedContent['Founding year of organization']}
          </p>
          <p>
            <strong>Place of Registration: </strong>
            {parsedContent['Place of registration (City; Country)']}
          </p>
          <p>
            <strong>Legal Form of Organisation: </strong>
            {parsedContent['Legal form of organization']}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProjectPersonOfContact
