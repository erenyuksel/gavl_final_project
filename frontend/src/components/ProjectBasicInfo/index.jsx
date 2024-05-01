const ProjectBasicInfo = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row w-96 bg-base-100">
        <div className="card-body items-center text-center justify-center">
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

export default ProjectBasicInfo
