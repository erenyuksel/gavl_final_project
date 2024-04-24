const ProjectThemeIndustry = ({ project }) => {
  const parsedContent = JSON.parse(project.content)

  return (
    <>
      <>
        <div className="card w-full sm:w-96 bg-base-100 shadow-xl">
          <div className="card-body overflow-scroll">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Theme & Industry</h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex flex-col">
                {parsedContent['theme 1'] ? (
                  <p className="badge badge-lg bg-blue-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['theme 1']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['theme 2'] ? (
                  <p className="badge badge-lg bg-blue-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['theme 2']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['theme 3'] ? (
                  <p className="badge badge-lg bg-blue-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['theme 3']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['theme 4'] ? (
                  <p className="badge badge-lg bg-blue-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['theme 4']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['theme 5'] ? (
                  <p className="badge badge-lg bg-blue-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['theme 5']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
              </div>
              <div className="flex flex-col">
                {parsedContent['Industry 1'] ? (
                  <p className="badge badge-lg bg-gray-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['Industry 1']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['Industry 2'] ? (
                  <p className="badge badge-lg bg-gray-500 text-white sm:badge-md mb-2 sm:mb-1 truncate">
                    {parsedContent['Industry 2']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
                {parsedContent['Industry 3'] ? (
                  <p className="badge badge-lg bg-gray-500 text-white sm:badge-md badge-outline mb-2 sm:mb-1 truncate">
                    {parsedContent['Industry 3']}
                  </p>
                ) : (
                  <div className="h-[38px] sm:h-[30px]"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default ProjectThemeIndustry
