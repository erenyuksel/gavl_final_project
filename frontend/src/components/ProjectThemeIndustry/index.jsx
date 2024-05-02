const ProjectThemeIndustry = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <div className="flex-wrap flex-col h-full w-full sm:flex-col justify-center">
        <div className="text-center text-black font-bold">
          {parsedContent.name}
        </div>
        <div className="flex-wrap flex-row text-center items-center w-full">
          <h3 className="m-5">
            <strong>Themes</strong>
          </h3>
          {parsedContent['theme 1'] ? (
            <p className="badge badge-lg bg-primary text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['theme 1']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
          )}
          {parsedContent['theme 2'] ? (
            <p className="badge badge-lg bg-primary text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['theme 2']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
          )}
          {parsedContent['theme 3'] ? (
            <p className="badge badge-lg bg-primary text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['theme 3']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
          )}
          {parsedContent['theme 4'] ? (
            <p className="badge badge-lg bg-primary text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['theme 4']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
          )}
          {parsedContent['theme 5'] ? (
            <p className="badge badge-lg bg-primary text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['theme 5']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
          )}
        </div>
        <div className="flex-wrap flex-row text-center items-center">
            <h3 className="m-5">
              <strong>Industry</strong>
            </h3>
            {parsedContent['Industry 1'] ? (
              <div className="badge badge-md bg-gray-400 text-white truncate">
                {parsedContent['Industry 1']}
              </div>
            ) : (
              <div className="sm:h-[5px]"></div>
            )}
          {parsedContent['Industry 2'] ? (
            <p className="badge badge-md bg-gray-400 text-white sm:badge-md sm:mb-1 truncate">
              {parsedContent['Industry 2']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
            )}
          {parsedContent['Industry 3'] ? (
            <p className="badge badge-md bg-gray-400 text-white sm:badge-md badge-outline sm:mb-1 truncate">
              {parsedContent['Industry 3']}
            </p>
          ) : (
            <div className="sm:h-[5px]"></div>
            )}
        </div>
            </div>
    </>
  )
}

export default ProjectThemeIndustry
