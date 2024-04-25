const ProjectSupportPriority = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <div className="card flex-row bg-base-100">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold mb-4">Support Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* First Priority */}
          <div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">First Priority</h3>
              <p>
                {
                  parsedContent[
                    'Where do you need support in your organization? (First Priority)'
                  ]
                }
              </p>
            </div>
          </div>

          {/* Second Priority */}
          <div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Second Priority</h3>
              <p>
                {
                  parsedContent[
                    'Where do you need support in your organization? (Second Priority)'
                  ]
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSupportPriority
