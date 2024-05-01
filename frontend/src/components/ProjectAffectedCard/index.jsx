const ProjectAffectedCard = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <div className="card flex-row bg-base-100">
      <div className="card-body gap-x-8 flex-row">
        {/* Affected Driver of Change */}
        <div>
        <h2 className="card-title text-lg font-bold mb-4">
          Affected Driver of Change
        </h2>
          <p>{parsedContent['Affected Driver of Change 1']}</p>

          <p>{parsedContent['Affected Driver of Change 2']}</p>

          <p>{parsedContent['Affected Driver of Change 3']}</p>

          <p>{parsedContent['Affected Driver of Change 4']}</p>

          <p>{parsedContent['Affected Driver of Change 5']}</p>
        </div>
        {/* Affected Realms */}
        <div>
        <h2 className="card-title text-lg font-bold mb-4">Affected Realms</h2>
          <p>{parsedContent['Affected Realm 1']}</p>

          <p>{parsedContent['Affected Realm 2']}</p>

          <p>{parsedContent['Affected Realm 3']}</p>

          <p>{parsedContent['Affected Realm 4']}</p>

          <p>{parsedContent['Affected Realm 5']}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectAffectedCard
