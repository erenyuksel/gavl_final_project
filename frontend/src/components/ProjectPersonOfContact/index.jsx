const ProjectPersonOfContact = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="card flex-row w-96 bg-base-100">
        <div className="card-body items-center text-center justify-center">
          <h2 className="card-title">{parsedContent['Contact Person']}</h2>
          <p>
            <strong>Position:</strong>{' '}
            {parsedContent['Position of Contact Person']}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProjectPersonOfContact
