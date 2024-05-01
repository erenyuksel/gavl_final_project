const ProjectPersonOfContact = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row w-96 bg-base-100">
        <div className="card-body items-center text-center justify-center">
          <figure>
            {parsedContent.project_logo ? (
              <div className="bg-inherit text-neutral-content rounded-full h-20 w-20">
                <img
                  src={parsedContent.project_logo}
                  alt={parsedContent.project_logo}
                  className="object-contain h-full w-full"
                />
              </div>
            ) : (
              <div className="bg-primary text-black rounded-full h-20 w-20 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {parsedContent['Contact Person'].charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </figure>
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
