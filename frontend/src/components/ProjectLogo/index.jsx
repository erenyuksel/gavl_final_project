const ProjectLogo = ({project}) => {
  const parsedContent = JSON.parse(project.content)

    return (
        <>
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
          </div>
        </>
    )
}

export default ProjectLogo